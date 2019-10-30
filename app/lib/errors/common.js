class CommonError extends Error {
  constructor(status, message, data = null) {
    super(message)
    ;(this._status = status), (this._data = data)
  }

  get status() {
    return this._status
  }

  get data() {
    return this._data
  }

  get isBarstoolError() {
    return true
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
      data: this.data
    }
  }
}

module.exports = CommonError
