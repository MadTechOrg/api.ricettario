'use strict'

const UserService = use('App/Services/UserService')
const ForbiddenException = use('App/Exceptions/ForbiddenException')

const { equals } = require('ramda')

class UserController {
  constructor() {
    this.userService = UserService
  }

  async show({ params, response, auth }) {
    if (equals(params.id, auth.user.id)) {
      const user = await this.userService.show(params.id)
      return response.json({
        user,
      })
    }
    throw new ForbiddenException()
  }

  async update({
    params, request, response, auth,
  }) {
    if (equals(params.id, auth.user.id)) {
      const attributes = request.only([
        'name',
        'birth_date',
        'first_login',
      ])
      const user = await this.userService.update(params.id, attributes)
      return response.json({ user })
    }
    throw new ForbiddenException()
  }
}

module.exports = UserController
