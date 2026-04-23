document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(globalThis.location.search)
  const productId = params.get('id')
  const userId = 1

  try {
    const response = await fetch(`/api/produtos/${productId}`)
    const product = await response.json()
    renderProductDetails(product, userId)
    if (typeof updateCartCount === 'function') {
      updateCartCount(userId)
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes do produto:', error)
  }
})

function renderProductDetails(product, userId) {
  const productDetails = document.getElementById('product-details')
  if (!productDetails) return

  productDetails.innerHTML = `
        <div class="col-md-6">
            <img src="${product.image}" alt="${product.name}" id="product-image" class="img-fluid">
        </div>
        <div class="col-md-6">
            <h2>${product.name}</h2>
            <p id="product-description">${product.description}</p>
            <p id="product-price">Preço: R$${product.price.toFixed(2)}</p>
            <div class="form-group">
                <label for="product-quantity">Quantidade:</label>
                <input type="number" id="product-quantity" value="1" min="1" class="form-control w-25 mb-2">
            </div>
            <button class="btn btn-primary" id="add-to-cart">Adicionar ao carrinho</button>
            <a href="/" class="btn btn-secondary ms-2">Voltar para Home</a>
        </div>
    `

  document
    .getElementById('add-to-cart')
    .addEventListener('click', () => handleAddToCart(product.id, userId))
}

async function handleAddToCart(productId, userId) {
  const quantity = document.getElementById('product-quantity').value
  try {
    await fetch('/api/carrinho', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity: Number.parseInt(quantity, 10) })
    })
    showSuccessAlert('Produto adicionado ao carrinho!')
    if (typeof updateCartCount === 'function') {
      updateCartCount(userId) // eslint-disable-line no-undef
    }
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error)
  }
}

function showSuccessAlert(message) {
  const alertContainer = document.getElementById('alert-container')
  if (!alertContainer) return

  alertContainer.classList.remove('d-none')
  alertContainer.classList.add('alert-success')
  alertContainer.innerHTML = message
  alertContainer.style.display = 'block'
  setTimeout(() => {
    alertContainer.style.display = 'none'
  }, 3000)
}
