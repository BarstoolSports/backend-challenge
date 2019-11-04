const { Model } = require('app/modules/common')

class NotesModel extends Model {
  schema() {
    return {
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
      userId: {
        type: String,
        required: true
      }
    }
  }
}

module.exports = NotesModel
