'use strict'

const { configure, formatters } = use('Validator')

configure({
  FORMATTER: formatters.JsonApi,
})

class ForgotPassword {
  get rules() {
    return {
      email: 'required|email',
    }
  }
}

module.exports = ForgotPassword
