const { Auth } = require('app/api/common')

class NotesAuth extends Auth {}

module.exports = new NotesAuth()
