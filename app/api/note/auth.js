const { Auth } = require('app/api/common')

class NoteAuth extends Auth {}

module.exports = new NoteAuth()
