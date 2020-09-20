'use strict'

const Config = use('Config')
const Recipe = use('App/Models/Recipe')
const NotFoundException = use('App/Exceptions/NotFoundException')

const { not, omit, equals, head, isEmpty } = require('ramda')

class UserService {
  async store(attributes) {
    const formattedAttributes = omit(['userId'], attributes)

    return Recipe.create({
      ...formattedAttributes,
      preparation: JSON.stringify(attributes.preparation.split(',')),
      ingredients: JSON.stringify(attributes.ingredients.split(',')),
      user_id: attributes.userId,
    })
  }

  async index({ filters, userId }) {
    const buildFilters = {
      user_id: userId,
    }
    if (filters.isFavorite) {
      buildFilters.is_favorite = equals(filters.isFavorite, 'true')
    }
    const recipes = Recipe.query()
      .where({ ...buildFilters })

    if (filters.name) {
      recipes.andWhere('name', 'ilike', `%${filters.name}`)
    }
    return recipes.fetch()
  }

  async update(recipeId, attributes) {
    const recipe = await Recipe.find(recipeId)

    if (not(equals(recipe.user_id, attributes.userId))) return {}
    const formattedAttributes = omit(['recipeId', 'userId'], attributes)
    recipe.merge({
      ...formattedAttributes,
    })
    if (attributes.preparation) {
      recipe.preparation = JSON.stringify(attributes.preparation.split(','))
    }
    if (attributes.ingredients) {
      recipe.ingredients = JSON.stringify(attributes.ingredients.split(','))
    }

    await recipe.save()
    return Recipe.find(recipeId)
  }

  async show({ userId, recipeId }) {
    const recipe = await Recipe.query()
    .where({
      id: recipeId,
      user_id: userId,
    })
    .fetch()

    return head(recipe.rows)
  }

  async destroy({ userId, recipeId }) {
    return Recipe.query()
      .where({
        id: recipeId,
        user_id: userId,
      })
      .delete()
  }
}

module.exports = new UserService(Config)
