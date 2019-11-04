const ForbiddenError = require('./forbidden')

class AccessLevelError extends ForbiddenError {
  constructor(message = 'You do not have access to this resource', accessLevelRequired, data) {
    super(message, data)
    this._accessLevelRequired = accessLevelRequired
  }

  get accessLevelRequired() {
    return this._accessLevelRequired
  }

  toJSON() {
    return {
      ...super.toJSON(),
      accessLevelRequired: this.accessLevelRequired
    }
  }
}

module.exports = AccessLevelError
