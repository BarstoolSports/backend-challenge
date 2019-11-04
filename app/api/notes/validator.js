const { Validator } = require('app/api/common')

class NoteValidator extends Validator {
  create(req) {
    req.checkBody('title').optional().len(1, 254)
    req.checkBody('message').optional().len(1, 254)
    return this.validate(req)
  }
}

module.exports = new NoteValidator()
