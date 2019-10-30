const CommonError = require('./common')

class UnauthorizedError extends CommonError {
  constructor(message = 'Invalid access token', data) {
    super(401, message, data)
  }
}

module.exports = UnauthorizedError
