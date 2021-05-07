const authService = require('app/modules/auth')
const { UnauthorizedError, ForbiddenError } = require('app/lib/errors')

class CommonAuth {
  /**
   * Requires a valid user auth token
   *
   * @method requiresLogin
   */
  async requiresLogin(req) {
    const token = parseAuthToken(req)
    if (!token) throw new UnauthorizedError()

    const auth = await authService.findOne({ token }, '_id user')
    if (!auth) throw new UnauthorizedError()

    req.authId = auth.id
    req.userId = auth.user
  }

  /**
   * Requires a valid auth token and logged in user
   * must be the same as the user id in the url
   *
   * @method requiresCurrentUser
   */
  async requiresCurrentUser(req) {
    await this.requiresLogin(req)
    const userId = req.params.userId || req.params.id
    if (req.userId !== userId) throw new ForbiddenError()
  }
}

function parseAuthToken(req) {
  return (req.headers.authorization || '').trim().toLowerCase().split(' ').pop()
}

module.exports = CommonAuth
