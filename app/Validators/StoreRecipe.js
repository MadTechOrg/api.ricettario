'use strict'

const { configure, formatters } = use('Validator')

configure({
  FORMATTER: formatters.JsonApi,
})

class StoreRecipe {
  get rules() {
    return {
      name: 'required|min:2',
      image_url: 'string',
      is_favorite: 'boolean',
      difficulty: 'required|in:easy,medium,hard',
      preparation_time: 'required|min:4',
      total_time: 'required|min:4',
      ingredients: 'required',
      preparation: 'required',
    }
  }

  get validateAll() {
    return true
  }
}

module.exports = StoreRecipe
