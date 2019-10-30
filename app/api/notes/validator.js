const { Validator } = require('app/api/common')

class NoteValidator extends Validator {

  create(req) {
    req.checkBody('title').optional().isEmail()
    req.checkBody('message').optional().len(1, 254)
    req.checkBody('user').optional().len(1, 64)
    return this.validate(req)
  }
}

module.exports = new NoteValidator()
