const CommonError = require('./common')

class NotFoundError extends CommonError {
  constructor(message = 'Not Found', data) {
    super(404, message, data)
  }

  get expires() {
    return 60
  }
}

module.exports = NotFoundError
