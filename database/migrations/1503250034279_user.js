'use strict'

/* @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.uuid('id').primary()
      table.string('name', 80).notNullable()
      table.string('email', 80).notNullable().unique()
      table.string('password', 60).nullable()
      table.string('provider_id').nullable().unique()
      table.string('provider_name').nullable()
      table.boolean('first_login').notNullable().defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
