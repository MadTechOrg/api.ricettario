'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Recipe extends Model {
  static boot() {
    super.boot()
    this.addHook('beforeCreate', 'IdGeneratorHook.uuid')
  }

  static get primaryKey() {
    return 'id'
  }

  recipes() {
    return this.belongsTo('App/Models/User')
  }

  static get incrementing() {
    return false
  }
}

module.exports = Recipe
