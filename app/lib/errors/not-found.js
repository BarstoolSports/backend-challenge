const httpStatus = require('http-status-codes')
const CommonError = require('./common')

class NotFoundError extends CommonError {

  constructor(message='Not Found', data) {
    super(httpStatus.NOT_FOUND, message, data)
  }

  get expires() {
    return 60
  }
}

module.exports = NotFoundError
