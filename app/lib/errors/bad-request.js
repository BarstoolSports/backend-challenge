const CommonError = require('./common')

class BadRequestError extends CommonError {
  constructor(message = 'Bad request', data) {
    super(400, message, data)
  }
}

module.exports = BadRequestError
