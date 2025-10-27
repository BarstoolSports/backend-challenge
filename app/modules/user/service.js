const { Service } = require('app/modules/common')

class UserService extends Service {
  async readAndUpdate(id, update) {
    return this.findByIdAndUpdate(id, update)
  }
}

module.exports = UserService
