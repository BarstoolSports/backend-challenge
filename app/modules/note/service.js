const { Service } = require('app/modules/common')

class NoteService extends Service {
  async findAllByUserId(userId) {
    return this.find({ userId })
  }
}

module.exports = NoteService
