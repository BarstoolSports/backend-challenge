const { validate, Validator } = require('app/api/common')
const { body } = validate

class AuthValidator extends Validator {
  async register(req) {
    const validations = [
      body('email').notEmpty().isEmail(),
      body('password').notEmpty().isLength(6, 64),
      body('firstName').notEmpty().isLength(1, 64),
      body('lastName').notEmpty().isLength(1, 64)
    ]
    await this.validate(req, validations, { sanitize: 'query' })
  }

  async login(req) {
    const validations = [body('email').notEmpty().isEmail(), body('password').notEmpty().isLength(0, 64)]
    await this.validate(req, validations, { sanitize: 'query' })
  }
}

module.exports = new AuthValidator()
