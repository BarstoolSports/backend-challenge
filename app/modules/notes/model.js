const { Model } = require('app/modules/common')

class NoteModel extends Model {
  schema() {
    return {
      userId: {
        type: String,
        ref: 'User',
        required: true,
        index: true
      },
      title: {
        type: String,
        trim: true,
        required: true
      },
      message: {
        type: String,
        trim: true,
        required: true
      },
      createdAt: {
        type: Date,
        required: false,
        default: Date.now
      },
      modifiedAt: {
        type: Date,
        required: false,
        default: Date.now
      },
      deleted: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
}

module.exports = NoteModel
