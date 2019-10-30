const { Auth } = require('app/api/common')

class UserAuth extends Auth {}

module.exports = new UserAuth()
