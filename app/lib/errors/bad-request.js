const httpStatus = require('http-status-codes')
const CommonError = require('./common')

class BadRequestError extends CommonError {

  constructor(message = 'Bad request', data) {
    super(httpStatus.BAD_REQUEST, message, data)
  }
}

module.exports = BadRequestError
