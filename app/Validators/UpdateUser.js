'use strict'

const { configure, formatters } = use('Validator')

configure({
  FORMATTER: formatters.JsonApi,
})

class UpdateUser {
  get rules() {
    return {
      name: 'min:2',
      first_login: 'boolean',
    }
  }

  get validateAll() {
    return true
  }
}

module.exports = UpdateUser
