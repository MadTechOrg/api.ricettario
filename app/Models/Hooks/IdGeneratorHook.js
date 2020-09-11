'use strict'

const { v4 } = require('uuid')
// eslint-disable-next-line
const IdGeneratorHook = (exports = module.exports = {})

IdGeneratorHook.uuid = async (model) => {
  model.id = v4()
}
