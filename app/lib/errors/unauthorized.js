const httpStatus = require('http-status-codes')
const CommonError = require('./common')

class UnauthorizedError extends CommonError {
  constructor(message = 'Invalid access token', data) {
    super(httpStatus.UNAUTHORIZED, message, data)
  }
}

module.exports = UnauthorizedError
