'use strict'

const { configure, formatters } = use('Validator')

configure({
  FORMATTER: formatters.JsonApi,
})

class ResetPassword {
  get rules() {
    return {
      password: 'required|min:6',
      token: 'required',
    }
  }

  get validateAll() {
    return true
  }
}

module.exports = ResetPassword
