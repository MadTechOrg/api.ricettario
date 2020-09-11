'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'You have no access to this item.'
const status = 403
const code = 'FORBIDDEN'

class ForbiddenException extends LogicalException {
  constructor() {
    super(message, status, code)
  }

  handle(error, { response }) {
    response
      .status(status)
      .send(message)
      .code(code)
  }
}

module.exports = ForbiddenException
