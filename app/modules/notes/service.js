const { Service } = require('app/modules/common')
const {userService } = require('../user/service')

class  NoteService extends Service {

      /**
   * Saves a new note by userId
   *
   * @method saveNote
   * @param {String} title
   * @param {String} message
   * @param {String} userId
   * @return {Promise}
   */
  async saveNote({ title, message, userId }) {
    if (!title) throw new Error('title is required')
    if (!message) throw new Error('message is required')
    if (!userId) throw new Error('userId is required')

    const note = await this.create({ userId, title, message })

    return note
  }


    /**
     * @method findByUserId
     * @param {String} userId
     * @return {Promise}
     */
    async findByUserId(userId, options = {}) {
        const { page = 1, limit = 10, sort = '-createdAt', search = '' } = options
        const skip = (page - 1) * limit
      
        let query = { userId: userId, deleted: false }
      
        // Add search filter for message text
        if (search) {
          query.$or = [
            { message: { $regex: search, $options: 'i' } }
          ]
        }
      
        const notes = await this.model
          .find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
      
        const total = await this.model.countDocuments(query)
      
        return {
          notes,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        }
    }


}

module.exports = NoteService