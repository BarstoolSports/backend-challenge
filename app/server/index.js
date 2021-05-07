const lambdaApi = require('lambda-api')
const { NotFoundError } = require('app/lib/errors')

class HttpServer {
  /**
   * @constructor
   */
  constructor() {
    this._router = lambdaApi()
  }

  /**
   * Router instance
   *
   * @param {Router} router
   */
  get router() {
    return this._router
  }

  /**
   * Run a lambda style http request
   *
   * @method run
   */
  run() {
    return this.router.run(...arguments)
  }

  /**
   * Register a router
   *
   * @method register
   */
  register() {
    return this.router.register(...arguments)
  }

  /**
   * Registers pre-route middleware
   *
   * @method registerMiddleware
   */
  registerMiddleware() {
    this.router.options('/*', (req, res) => {
      res.cors({ maxAge: 600 })
      res.send('')
    })
    this.router.use((req, res, next) => {
      res.cors({ maxAge: 600 })
      res.header('cache-control', 'private')
      next()
    })
  }

  /**
   * Registers post-route error handlers
   *
   * @method registerErrorHandler
   */
  registerErrorHandler() {
    this.router.use((err, req, res, next) => {
      if (err.name === 'RouteError') {
        err = new NotFoundError()
      }

      const status = err.status || 500
      const message = err.message
      const title = err.title
      const stack = status < 500 ? null : err.stack

      console.error(`${status} - ${message}`)
      if (stack) console.error(stack)

      res.status(status).send({ status, title, message, stack })

      next()
    })
  }
}

module.exports = new HttpServer()
