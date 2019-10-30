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
      // For sake of time I made this a string and not a dbref.
      user: {
        type: String,
        required: true
      }
    }
  }
}

module.exports = NotesModel
