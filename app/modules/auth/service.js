const bcrypt = require('bcryptjs')
const errors = require('app/lib/errors')
const utils = require('app/lib/utils')
const userService = require('app/modules/user')
const { Service } = require('app/modules/common')

// Constants
const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_LENGTH = 64
const SALT_WORK_FACTOR = 12

/**
 * @class AuthService
 */
class AuthService extends Service {
  get SALT_WORK_FACTOR() {
    return SALT_WORK_FACTOR
  }

  /**
   * Register a new user by email and password
   *
   * @method register
   * @param {Object} options
   * @param {String} options.email
   * @param {String} options.password
   * @param {String} options.firstName
   * @param {String} options.lastName
   * @return {Promise}
   */
  async register({ email, password, firstName, lastName }) {
    if (!email) throw new Error('email is required')
    if (!password) throw new Error('password is required')
    if (!firstName) throw new Error('firstName is required')
    if (!lastName) throw new Error('lastName is required')

    const [user, hash, token] = await Promise.all([
      userService.create({ email: sanitizeEmail(email), firstName, lastName }),
      hashPassword(password),
      generateAuthToken()
    ])

    const auth = await this.create({
      user: user.id,
      password: hash,
      token: token
    })

    return { auth, user }
  }

  /**
   * Login a user by email and password
   *
   * @method loginByEmail
   * @param {String} options.email
   * @param {String} options.password
   * @return {Promise}
   */
  async login({ email, password }) {
    if (!email) throw new Error('email is required')
    if (!password) throw new Error('password is required')

    const user = await userService.findOne({ email: sanitizeEmail(email) })
    if (!user) throw new errors.BadRequestError('This email does not exist, please Sign Up for a new account.')

    const auth = await this.findOne({ user: user.id }, '+password')
    await comparePassword(auth, password)

    return { auth, user }
  }
}

async function generateAuthToken() {
  const hex = await utils.randomHex(64)
  return hex.toLowerCase()
}

function sanitizeEmail(input) {
  return String(input).trim().toLowerCase()
}

function sanitizePassword(input) {
  const output = String(input).trim()
  if (output.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
  }
  if (output.length > MAX_PASSWORD_LENGTH) {
    throw new Error(`password must be ${MAX_PASSWORD_LENGTH} characters or less.`)
  }
  return output
}

async function hashPassword(input) {
  const output = sanitizePassword(input)
  return bcrypt.hash(output, SALT_WORK_FACTOR)
}

async function comparePassword(auth, input) {
  const output = sanitizePassword(input)
  const match = await bcrypt.compare(output, auth.password)
  if (!match) {
    throw new errors.UnauthorizedError('Password does not match')
  }
}

module.exports = AuthService
