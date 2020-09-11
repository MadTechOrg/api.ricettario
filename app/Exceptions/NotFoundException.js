'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'Item not found with given parameters.'
const status = 404
const code = 'NOT_FOUND'

class NotFoundException extends LogicalException {
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

module.exports = NotFoundException
