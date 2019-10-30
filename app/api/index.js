class Api {
  /**
   * @constructor
   */
  constructor() {
    this._handlers = [require('./auth'), require('./status'), require('./user')]
  }

  get handlers() {
    return this._handlers
  }
}

module.exports = new Api()
