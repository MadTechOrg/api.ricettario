'use strict'

const { configure, formatters, rule } = use('Validator')

configure({
  FORMATTER: formatters.JsonApi,
})

class UpdateRecipe {
  get rules() {
    return {
      name: 'min:2',
      image_url: 'string',
      is_favorite: 'boolean',
      difficulty: 'in:easy,medium,hard',
      preparation_time: 'min:4',
      total_time: 'min:4',
      ingredients: 'string',
      preparation: 'string',
    }
  }

  get validateAll() {
    return true
  }
}

module.exports = UpdateRecipe
