'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'Request is not valid with given parameters'
const status = 400

class BadRequestException extends LogicalException {
  constructor() {
    super(message, status)
  }

  handle(error, { response }) {
    response
      .status(status)
      .send(message)
  }
}

module.exports = BadRequestException
