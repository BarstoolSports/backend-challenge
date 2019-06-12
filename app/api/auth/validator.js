const { Validator } = require('app/api/common')

class AuthValidator extends Validator {

  register(req) {
    req.checkBody('email').notEmpty().isEmail()
    req.checkBody('password').notEmpty().len(6, 64)
    req.checkBody('firstName').notEmpty().len(1, 64)
    req.checkBody('lastName').notEmpty().len(1, 64)
    return this.validate(req)
  }

  login(req) {
    req.checkBody('email').notEmpty().isEmail()
    req.checkBody('password').notEmpty().len(0, 64)
    return this.validate(req)
  }
}

module.exports = new AuthValidator()
