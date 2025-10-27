const { Model } = require('app/modules/common')

class NoteModel extends Model {
  schema() {
    return {
      userId: {
        type: String,
        trim: true,
        required: true,
        index: true
      },
      title: {
        type: String,
        trim: true,
        required: true,
        maxLength: 64
      },
      message: {
        type: String,
        trim: true,
        required: true,
        maxLength: 500
      }
    }
  }
}

module.exports = NoteModel
