const { Validator } = require('app/api/common')

class UserValidator extends Validator {
  update(req) {
    req
      .checkBody('email')
      .optional()
      .isEmail()
    req
      .checkBody('firstName')
      .optional()
      .len(1, 64)
    req
      .checkBody('lastName')
      .optional()
      .len(1, 64)
    return this.validate(req)
  }
}

module.exports = new UserValidator()
