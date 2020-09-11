'use strict'

const { configure, formatters } = use('Validator')

configure({
  FORMATTER: formatters.JsonApi,
})

class LoginUser {
  get rules() {
    return {
      email: 'required|email',
      password: 'required|min:6',
    }
  }
}

module.exports = LoginUser
