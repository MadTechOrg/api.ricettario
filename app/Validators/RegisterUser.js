'use strict'

const { configure, formatters } = use('Validator')

configure({
  FORMATTER: formatters.JsonApi,
})

class RegisterUser {
  get rules() {
    return {
      name: 'required|min:2',
      email: 'required|email|unique:users',
      password: 'required|min:6',
      provider_id: 'string',
      provider_name: 'string',
    }
  }

  get validateAll() {
    return true
  }
}

module.exports = RegisterUser
