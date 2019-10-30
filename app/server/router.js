const { Router } = require('express')

class HttpRouter {
  /**
   * @static
   * @param {express.Router} router
   */
  static get router() {
    return new HttpRouter()
  }

  /**
   * @constructor
   */
  constructor() {
    this._router = new Router()
  }

  /**
   * @method get
   */
  get(path, handler) {
    this._asyncRoute('get', path, handler)
  }

  /**
   * @method post
   */
  post(path, handler) {
    this._asyncRoute('post', path, handler)
  }

  /**
   * @method put
   */
  put(path, handler) {
    this._asyncRoute('put', path, handler)
  }

  /**
   * @method patch
   */
  patch(path, handler) {
    this._asyncRoute('patch', path, handler)
  }

  /**
   * @method delete
   */
  delete(path, handler) {
    this._asyncRoute('delete', path, handler)
  }

  /**
   * Attaches the internal router to a parent router
   *
   * @method attach
   * @param {express.Router} router
   */
  attach(router) {
    router.use(this._router)
  }

  /**
   * @private
   * @method _asyncRoute
   * @param {String} methodName
   * @param {String} path
   * @param {Function} handler
   */
  _asyncRoute(methodName, path, handler) {
    this._router[methodName](path, async (req, res, next) => {
      try {
        await handler(req, res)
      } catch (err) {
        next(err)
      }
    })
  }
}

module.exports = HttpRouter
