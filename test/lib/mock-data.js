const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')
const authService = require('app/modules/auth')
const userService = require('app/modules/user')
const notesService = require('app/modules/user')

class MockData {

  /**
   * @method uuid
   */
  uuid() {
    return uuid(...arguments)
  }

  /**
   * @method hash
   */
  hash(input) {
    return bcrypt.hash(input, authService.SALT_WORK_FACTOR)
  }

  /**
   * @method mockAuthAndUser
   */
  async mockAuthAndUser(options = {}) {
    const user = await this.mockUser(options)
    const auth = await this.mockAuth({ ...options, user: user.id })
    return auth
  }

  /**
   * @method mockAuthUserAndNotes
   */
  async mockAuthUserAndNotes(options = {}) {
    const user = await this.mockUser(options)
    const auth = await this.mockAuth({ ...options, user: user.id })
    const notes = await this.mockNotes({user: user.id})
    return {...auth, notes}
  }

  /**
   * @method mockAuth
   */
  mockAuth(options = {}) {
    const data = Object.assign({
      token: uuid(),
      user: uuid(),
      password: uuid()
    }, options)
    return authService.create(data)
  }

  /**
   * @method mockUser
   */
  mockUser(options = {}) {
    const data = Object.assign({
      email: `${uuid()}@test.com`,
      firstName: 'John',
      lastName: 'Doe'
    }, options)
    return userService.create(data)
  }

  /**
   * @method mockNotes
   */
  mockNotes(options = {}) {
    const data = Object.assign({
      title: uuid(),
      message: uuid(),
      user: options.user
    }, options)
    return notesService.create(data)
  }
}

module.exports = new MockData()
