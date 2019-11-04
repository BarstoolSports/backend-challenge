const httpStatus = require('http-status-codes')
const CommonError = require('./common')

class ServiceUnavailableError extends CommonError {
  constructor(message = 'Service unavailable', data) {
    super(httpStatus.SERVICE_UNAVAILABLE, message, data)
  }
}

module.exports = ServiceUnavailableError
