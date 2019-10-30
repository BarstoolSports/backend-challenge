const httpStatus = require('http-status-codes')
const CommonError = require('./common')

class ForbiddenError extends CommonError {

  constructor(message='You do not have access to this resource', data) {
    super(httpStatus.FORBIDDEN, message, data)
  }
}

module.exports = ForbiddenError
