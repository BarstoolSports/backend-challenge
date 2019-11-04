const crypto = require('crypto')

class Utils {
  /**
   * Produces a secure random string of alphanumeric characters
   *
   * @method randomHex
   * @param {Number} length
   * @return {Promise<String>}
   */
  async randomHex(length) {
    const buffer = await new Promise((resolve, reject) => {
      const hexLength = Math.ceil(length / 2.0)
      crypto.randomBytes(hexLength, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
    return buffer.toString('hex')
  }
}

module.exports = new Utils()
