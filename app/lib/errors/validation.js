const CommonError = require('./common')

class ValidationError extends CommonError {
  constructor(data) {
    const firstError = data[0]
    const message = `Validation Error - '${firstError.message || firstError.msg}' for '${firstError.param}' in ${
      firstError.location
    }`
    super(422, message)
  }
}

module.exports = ValidationError
