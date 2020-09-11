'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/session', 'AuthController.login').validator('LoginUser')
Route.post('/register', 'AuthController.register').validator('RegisterUser')
Route.post('/forgot', 'AuthController.forgot').validator('ForgotPassword')
Route.post('/reset', 'AuthController.reset').validator('ResetPassword')
Route.post('/social/:provider', 'AuthController.socialAuth').validator('SocialAuth')
Route.delete('/session', 'AuthController.logout')
Route.resource('user', 'UserController')
  .apiOnly()
  .middleware('auth')
  .validator(new Map([
    [['user.update'], ['UpdateUser']],
  ]))
