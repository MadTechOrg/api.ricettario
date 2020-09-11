'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'Request conflicts with existent items.'
const status = 409
const code = 'CONFLICT'

class ConflictException extends LogicalException {
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

module.exports = ConflictException
