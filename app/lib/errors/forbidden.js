const CommonError = require('./common')

class ForbiddenError extends CommonError {
  constructor(message = 'You do not have access to this resource', data) {
    super(403, message, data)
  }
}

module.exports = ForbiddenError
