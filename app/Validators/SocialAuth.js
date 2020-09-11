'use strict'

const { configure, formatters } = use('Validator')

configure({
  FORMATTER: formatters.JsonApi,
})

class SocialAuth {
  get rules() {
    return {
      accessToken: 'required',
    }
  }
}

module.exports = SocialAuth
