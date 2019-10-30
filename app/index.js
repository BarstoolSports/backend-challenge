class App {
  constructor() {
    this._api = require('app/api')
    this._server = require('app/server')
    this._database = require('app/lib/mongodb')
  }

  get api() {
    return this._api
  }

  get server() {
    return this._server
  }

  get database() {
    return this._database
  }

  start() {
    // Register middleware
    this.server.registerMiddleware()

    // Register all routes
    for (const handler of this.api.handlers) {
      this.server.register(handler.router)
    }

    // Register error handlers
    this.server.registerErrorHandler()

    // Connect to db
    this.database.connect()

    return this
  }
}

module.exports = new App()
