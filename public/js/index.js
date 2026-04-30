document.addEventListener('DOMContentLoaded', async () => {
  const userId = 1
  let currentPage = 1
  const limit = 9

  async function fetchProducts(page) {
    try {
      const response = await fetch(`/api/produtos?page=${page}&limit=${limit}`)
      const data = await response.json()
      renderProductList(data)
      renderPagination(data)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    }
  }

  function renderProductList(data) {
    const productList = document.getElementById('product-list')
    if (!productList) return
    productList.innerHTML = ''

    data.products.forEach((product) => {
      const productCard = document.createElement('div')
      productCard.className = 'col-md-4 mb-4'
      productCard.innerHTML = `
                <div class="card">
                    <a href="/product.html?id=${product.id}">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    </a>
                    <div class="card-body">
                        <h3>
                            <a href="/product.html?id=${product.id}" class="text-dark text-decoration-none">${product.name}</a>
                        </h3>
                        <p class="card-text">${product.description}</p>
                        <p>Preço: R$${product.price.toFixed(2)}</p>
                        <div class="form-group">
                            <label for="quantity-${product.id}">Quantidade:</label>
                            <input type="number" id="quantity-${product.id}" value="1" min="1" class="form-control w-50 mb-2">
                        </div>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
                    </div>
                </div>
            `
      productList.appendChild(productCard)
    })

    attachAddToCartEvents()
  }

  function renderPagination(data) {
    const pagination = document.getElementById('pagination')
    if (!pagination) return
    pagination.innerHTML = ''

    // Botão "Anterior"
    const prevPageItem = createPageItem('Anterior', data.currentPage - 1, data.currentPage === 1)
    pagination.appendChild(prevPageItem)

    // Botões de página
    for (let i = 1; i <= data.totalPages; i++) {
      const pageItem = createPageItem(i, i, i === data.currentPage, i === data.currentPage)
      pagination.appendChild(pageItem)
    }

    // Botão "Próximo"
    const nextPageItem = createPageItem(
      'Próximo',
      data.currentPage + 1,
      data.currentPage === data.totalPages
    )
    pagination.appendChild(nextPageItem)
  }

  function createPageItem(label, page, isDisabled, isActive = false) {
    const li = document.createElement('li')
    li.className = `page-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`
    li.innerHTML = `<a class="page-link" href="#" data-page="${page}">${label}</a>`
    return li
  }

  function attachAddToCartEvents() {
    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', async function () {
        const originalText = this.textContent
        this.disabled = true
        this.textContent = 'Adicionando...'

        const productId = this.dataset.id
        const quantity = document.getElementById(`quantity-${productId}`).value
        try {
          const response = await fetch('/api/carrinho', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, productId, quantity: Number.parseInt(quantity, 10) })
          })

          if (!response.ok) throw new Error('Erro ao adicionar')

          showSuccessAlert('Produto adicionado ao carrinho!')
          if (typeof updateCartCount === 'function') {
            updateCartCount(userId)
          }
        } catch (error) {
          console.error('Erro ao adicionar produto ao carrinho:', error)
          showSuccessAlert('Erro ao adicionar produto!', 'error')
        } finally {
          this.disabled = false
          this.textContent = originalText
        }
      })
    })
  }

  function showSuccessAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container')
    if (!alertContainer) return
    alertContainer.classList.remove('d-none', 'alert-success', 'alert-danger')
    alertContainer.classList.add(type === 'success' ? 'alert-success' : 'alert-danger')
    alertContainer.innerHTML = message
    alertContainer.style.display = 'block'
    setTimeout(() => {
      alertContainer.style.display = 'none'
    }, 3000)
  }

  fetchProducts(currentPage)

  const paginationElement = document.getElementById('pagination')
  if (paginationElement) {
    paginationElement.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        event.preventDefault()
        const page = Number.parseInt(event.target.dataset.page, 10)
        if (page !== currentPage && page > 0) {
          currentPage = page
          fetchProducts(currentPage)
        }
      }
    })
  }
})
