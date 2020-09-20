'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecipesSchema extends Schema {
  up() {
    this.create('recipes', (table) => {
      table.uuid('id').primary()
      table.string('name', 80).notNullable()
      table.string('image_url').nullable()
      table.boolean('is_favorite').notNullable().defaultTo(false)
      table.string('difficulty').notNullable()
      table.string('preparation_time', 5).notNullable()
      table.string('total_time', 5).notNullable()
      table.jsonb('ingredients').notNullable()
      table.jsonb('preparation').notNullable()
      table.uuid('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('recipes')
  }
}

module.exports = RecipesSchema
