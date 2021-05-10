const { validate, Validator } = require('app/api/common')
const { body } = validate

class UserValidator extends Validator {
  async update(req) {
    const validations = [
      body('email').optional().isEmail(),
      body('firstName').optional().isLength(1, 64),
      body('lastName').optional().isLength(1, 64)
    ]
    await this.validate(req, validations, { sanitize: 'query' })
  }
}

module.exports = new UserValidator()
