'use strict'

const UserService = use('App/Services/UserService')
const AuthService = use('App/Services/AuthService')
const {
  not,
  isNil,
} = require('ramda')

class AuthController {
  constructor() {
    this.userService = UserService
    this.authService = AuthService
  }

  async register({ request, response, auth }) {
    const data = request.only(['name', 'email', 'password'])
    await this.userService.store(data)
    const authentication = await this.authService.authenticate(
      {
        email: data.email,
        password: data.password,
      },
      auth,
    )
    return response.json(authentication)
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all()
    const authentication = await this.authService.authenticate({ email, password }, auth)
    return response.json(authentication)
  }

  async forgot({ request }) {
    const email = request.input('email')
    await this.authService.forgot(email)
  }

  async reset({ request }) {
    const data = request.only(['token', 'password'])
    await this.authService.reset(data)
  }

  async socialAuth({
    request,
    response,
    params,
    ally,
    auth,
  }) {
    const { accessToken } = request.all()
    const { provider } = params
    try {
      const userData = await ally.driver(provider).getUserByToken(accessToken)
      const authUser = await this.userService.findByProvider({
        providerId: userData.getId(),
        provider,
      })
      if (not(isNil(authUser))) {
        const { token } = await auth.generate(authUser)
        return {
          authUser,
          token,
        }
      }
      const user = await this.userService.store({
        provider_name: provider,
        name: userData.getName(),
        email: userData.getEmail(),
        provider_id: userData.getId(),
        photo_url: userData.getAvatar(),
      })
      const { token } = await auth.generate(user)

      return response.json({
        user,
        token,
      })
    } catch (error) {
      return response.unauthorized('invalid token')
    }
  }
}

module.exports = AuthController
