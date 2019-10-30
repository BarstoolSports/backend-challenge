const httpStatus = require('http-status-codes')
const authService = require('app/modules/auth')

/**
 * Register a new user
 *
 * @method register
 */
exports.register = async (req, res) => {
  const result = await authService.register(req.body)
  res.status(httpStatus.CREATED).send(result)
}

/**
 * Login an existing user
 *
 * @method login
 */
exports.login = async (req, res) => {
  const result = await authService.login(req.body)
  res.status(httpStatus.OK).send(result)
}
