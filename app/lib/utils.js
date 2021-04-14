const crypto = require('crypto')
const _ = require('lodash')

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

  /**
   * Flattens a nested object structure to MongoDB dot syntax
   *
   * @method flattenObject
   * @param {Object} object
   * @return {Object}
   */
  flattenObject(_obj, _path = []) {
    const _flattenObject = (obj, path) => {
      return !_.isPlainObject(obj)
        ? { [path.join('.')]: obj }
        : Object.entries(obj).reduce((acc, [key, value]) => _.merge(acc, _flattenObject(value, [...path, key])), {})
    }
    return _flattenObject(_obj, _path)
  }

  /**
   * Produces an array from input
   *
   * @method asArray
   * @param {Any} input
   * @return {Array}
   */
  asArray(input) {
    if (input === null || input === undefined) {
      return []
    }
    return Array.isArray(input) ? [...input] : [input]
  }
}

module.exports = new Utils()
