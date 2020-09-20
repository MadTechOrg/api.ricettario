'use strict'

const RecipeService = use('App/Services/RecipeService')

const recipeAttributes = [
  'name',
  'image_url',
  'is_favorite',
  'difficulty',
  'preparation_time',
  'total_time',
  'ingredients',
  'preparation',
  'total_time',
]

class RecipeController {
  constructor() {
    this.recipeService = RecipeService
  }

  async store({ request, response, auth }) {
    const attributes = request.only(recipeAttributes)
    const recipe = await this.recipeService.store({
      ...attributes,
      userId: auth.user.id,
    })

    return response.json({
      recipe,
    })
  }

  async index({ request, response, auth }) {
    const recipes = await this.recipeService.index({
      filters: request.get(),
      userId: auth.user.id,
    })

    return response.json({
      recipes,
    })
  }

  async show({ params, response, auth }) {
    const recipe = await this.recipeService.show({
      userId: auth.user.id,
      recipeId: params.id,
    })

    return response.json({
      recipe,
    })
  }

  async destroy({ params, response, auth }) {
    const recipe = await this.recipeService.destroy({
      userId: auth.user.id,
      recipeId: params.id,
    })

    return response.json({
      recipe,
    })
  }

  async update({
    params, request, response, auth,
  }) {
    const attributes = request.only(recipeAttributes)
    const recipe = await this.recipeService.update(params.id, {
      userId: auth.user.id,
      ...attributes,
    })
    return response.json({ recipe })
  }
}

module.exports = RecipeController
