document.addEventListener('DOMContentLoaded', function () {
  const paymentCard = document.getElementById('payment-card')
  const paymentBoleto = document.getElementById('payment-boleto')
  const paymentPix = document.getElementById('payment-pix')
  const cardDetails = document.getElementById('card-details')
  const boletoDetails = document.getElementById('boleto-details')
  const pixDetails = document.getElementById('pix-details')
  const boletoCode = document.getElementById('boleto-code')
  const pixKey = document.getElementById('pix-key')
  const createAccountCheckbox = document.getElementById('create-account')
  const passwordFields = document.getElementById('password-fields')
  const form = document.getElementById('checkout-form')

  // Mostrar campos com base na seleção de pagamento
  paymentCard.addEventListener('change', function () {
    cardDetails.classList.remove('d-none')
    boletoDetails.classList.add('d-none')
    pixDetails.classList.add('d-none')
  })

  paymentBoleto.addEventListener('change', function () {
    cardDetails.classList.add('d-none')
    boletoDetails.classList.remove('d-none')
    pixDetails.classList.add('d-none')
    boletoCode.textContent = generateBoletoCode()
  })

  paymentPix.addEventListener('change', function () {
    cardDetails.classList.add('d-none')
    boletoDetails.classList.add('d-none')
    pixDetails.classList.remove('d-none')
    const pixData = generatePixDetails()
    pixKey.textContent = pixData.key
  })

  createAccountCheckbox.addEventListener('change', function () {
    passwordFields.classList.toggle('d-none', !this.checked)
  })

  form.addEventListener('submit', function (event) {
    event.preventDefault()
    clearValidationMessages()

    const hasRequiredErrors = validateRequiredFields([
      'first-name',
      'last-name',
      'address',
      'number',
      'cep',
      'email'
    ])
    const hasEmailErrors = validateEmailFormat('email')
    const hasCepErrors = validateCepFormat('cep')
    const hasAccountErrors = validateAccountCreation(createAccountCheckbox.checked)

    const selectedPayment = document.querySelector('input[name="payment-method"]:checked')
    const paymentMethodValue = selectedPayment ? selectedPayment.value : ''
    const hasPaymentErrors = validatePaymentDetails(selectedPayment, paymentMethodValue)

    if (!document.getElementById('terms').checked) {
      showError(document.getElementById('terms'), 'Este campo é obrigatório.')
      return
    }

    if (
      hasRequiredErrors ||
      hasEmailErrors ||
      hasCepErrors ||
      hasAccountErrors ||
      hasPaymentErrors
    ) {
      showAlert('Por favor, preencha todos os campos obrigatório marcados com asteriscos!')
      return
    }

    const userId = 1 // Ou obtenha o ID do usuário logado de um estado global ou do localStorage
    const formData = {
      userId: userId,
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      address: document.getElementById('address').value,
      number: document.getElementById('number').value,
      cep: document.getElementById('cep').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      paymentMethod: paymentMethodValue,
      createAccount: createAccountCheckbox.checked,
      cardNumber:
        paymentMethodValue === 'credit_card' ? document.getElementById('card-number').value : null,
      cardExpiry:
        paymentMethodValue === 'credit_card' ? document.getElementById('card-expiry').value : null,
      cardCvc:
        paymentMethodValue === 'credit_card' ? document.getElementById('card-cvc').value : null,
      boletoCode: paymentMethodValue === 'boleto' ? boletoCode.textContent : null,
      pixKey: paymentMethodValue === 'pix' ? pixKey.textContent : null
    }

    if (formData.createAccount) {
      formData.password = document.getElementById('password').value
    }

    fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text)
          })
        }
        return response.json()
      })
      .then((data) => {
        globalThis.location.href = `/status.html?orderId=${data.id}`
      })
      .catch((error) => {
        showAlert(error.message)
      })
  })
})

function generateBoletoCode() {
  return '23793.38128 60082.677139 66003.996498 1 89440000010000'
}

function generatePixDetails() {
  return {
    key: '123e4567-e89b-12d3-a456-426614174000'
  }
}

function showError(element, message) {
  const errorMessage = document.createElement('div')
  errorMessage.classList.add('invalid-feedback')
  errorMessage.textContent = message
  element.parentNode.appendChild(errorMessage)
  element.classList.add('is-invalid')
}

function showAlert(message) {
  const alertContainer = document.getElementById('alert-container')
  alertContainer.classList.remove('d-none')
  alertContainer.innerHTML = `<p>${message}</p>`
  globalThis.scrollTo(0, 0)
}

function clearValidationMessages() {
  const alertContainer = document.getElementById('alert-container')
  document.querySelectorAll('.is-invalid').forEach((element) => {
    element.classList.remove('is-invalid')
  })
  document.querySelectorAll('.invalid-feedback').forEach((element) => {
    element.remove()
  })
  alertContainer.classList.add('d-none')
}

function validateRequiredFields(fieldIds) {
  let hasErrors = false
  fieldIds.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    if (!field.value.trim()) {
      hasErrors = true
      showError(field, 'Este campo é obrigatório.')
    }
  })
  return hasErrors
}

function validateEmailFormat(fieldId) {
  const field = document.getElementById(fieldId)
  const value = field.value.trim()
  const regex = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/
  if (value.length > 254 || !regex.test(value)) {
    showError(field, 'Por favor, insira um email válido.')
    return true
  }
  return false
}

function validateCepFormat(fieldId) {
  const field = document.getElementById(fieldId)
  if (field.value.trim().length !== 8) {
    showError(field, 'O CEP deve ter 8 caracteres.')
    return true
  }
  return false
}

function validateAccountCreation(isChecked) {
  if (!isChecked) return false
  let hasErrors = false
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('confirm-password').value
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/

  if (!regex.test(password)) {
    showError(
      document.getElementById('password'),
      'A senha deve conter no mínimo 6 caracteres, incluindo uma letra maiúscula e um caractere especial.'
    )
    hasErrors = true
  }
  if (password !== confirmPassword) {
    showError(document.getElementById('confirm-password'), 'As senhas não coincidem.')
    hasErrors = true
  }
  return hasErrors
}

function validatePaymentDetails(selectedPayment, methodValue) {
  let hasErrors = false
  if (!selectedPayment) {
    showAlert('Por favor, preencha todos os campos obrigatórios marcados com asteriscos!')
    hasErrors = true
  }

  if (methodValue === 'credit_card') {
    const cardFields = ['card-number', 'card-expiry', 'card-cvc']
    cardFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId)
      if (!field.value.trim()) {
        hasErrors = true
        showError(field, 'Este campo é obrigatório.')
      }
    })
  }
  return hasErrors
}
