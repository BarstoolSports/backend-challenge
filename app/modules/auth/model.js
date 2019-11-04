const { Model } = require('app/modules/common')

class AuthModel extends Model {
  schema() {
    return {
      token: {
        type: String,
        required: true,
        index: {
          unique: true
        }
      },
      user: {
        type: String,
        ref: 'User',
        required: true,
        index: true
      },
      password: {
        type: String,
        select: false,
        required: true
      }
    }
  }

  toJSON(doc) {
    super.toJSON(doc)
    doc.password = undefined
  }
}

module.exports = AuthModel
