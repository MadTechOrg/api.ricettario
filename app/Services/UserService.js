'use strict'

const Config = use('Config')
const User = use('App/Models/User')
const BadRequestException = use('App/Exceptions/BadRequestException')
const NotFoundException = use('App/Exceptions/NotFoundException')

class UserService {
  async store(attributes) {
    try {
      return User.create(attributes)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async update(userId, attributes) {
    try {
      const user = await User.find(userId)
      user.merge(attributes)
      await user.save()
      return User.find(userId)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async show(userId) {
    try {
      return User.find(userId)
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async findByProvider({ providerId, provider }) {
    return User.query()
      .where({
        provider_name: provider,
        provider_id: providerId,
      })
      .first()
  }
}

module.exports = new UserService(Config)
