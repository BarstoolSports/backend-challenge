const { validate, Validator } = require('app/api/common')
const { body } = validate

class NoteValidator extends Validator {
  async create(req) {
    const validations = [
      body('title').isLength({ min: 1, max: 64 }).withMessage('title must be between 1 and 64 characters'),
      body('message').isLength({ min: 1, max: 500 }).withMessage('message must be between 1 and 500 characters')
    ]
    await this.validate(req, validations, { sanitize: 'body' })
  }
}

module.exports = new NoteValidator()
