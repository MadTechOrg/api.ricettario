'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'Internal server error.'
const status = 500
const code = 'INTERNAL_SERVER_ERROR'

class InternalError extends LogicalException {
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

module.exports = InternalError
