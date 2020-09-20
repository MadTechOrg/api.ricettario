'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFoundException extends LogicalException {
  handle(error, { response }) {
    response
      .status(404)
      .send('Item not found with given parameters.')
      .code('NOT_FOUND')
  }
}

module.exports = NotFoundException
