'use strict'

const { randomBytes } = require('crypto')
const { promisify } = require('util')
const moment = require('moment')

const User = use('App/Models/User')
const Token = use('App/Models/Token')
const BadRequestException = use('App/Exceptions/BadRequestException')
const Config = use('Config')
const Mail = use('Mail')
const Env = use('Env')

class AuthService {
  async authenticate({ email, password }, auth) {
    const { token } = await auth.attempt(email, password)
    if (token) {
      const user = await User.findBy('email', email)
      return {
        user,
        token,
      }
    }
  }

  async forgot(email) {
    const user = await User.findByOrFail('email', email)

    const random = await promisify(randomBytes)(24)
    const token = random.toString('hex')

    await user.tokens().create({
      token,
      type: 'forgotpassword,',
    })

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`

    await Mail.send(
      'emails.forgot-password',
      { name: user.name, resetPasswordUrl },
      (message) => {
        message
          .to(user.email)
          .from('contact.octocouple@gmail.com')
          .subject('Ricettario - Password recovery')
      },
    )
  }

  async reset({ password, token }) {
    const userToken = await Token.findByOrFail('token', token)
    if (
      moment(userToken.created_at, 'YYYY-MM-DD HH:mm:ss').isBefore(moment().subtract(1, 'days'))
    ) {
      await userToken.delete()
      throw new BadRequestException()
    }

    const user = await userToken.user().fetch()
    user.merge({ password })
    await user.save()
    await userToken.delete()
  }
}

module.exports = new AuthService(Config)
