const { ValidationError } = require('app/lib/errors')
const { validationResult, matchedData } = require('express-validator')
const { asArray, flattenObject } = require('app/lib/utils')

class CommonValidator {
  /**
   * @method validate
   */
  async validate(req, validations, options = {}) {
    await Promise.all(validations.map((validation) => validation.run(req)))
    const errors = validationResult(req)

    if (errors.isEmpty() !== true) {
      throw new ValidationError(errors.array())
    }

    // Sanitize request options
    asArray(options.sanitize).forEach((key) => {
      req[key] = matchedData(req, { locations: [key] })
    })

    // Flatten request options
    asArray(options.flatten).forEach((key) => {
      req[key] = flattenObject(req[key])
    })
  }
}

module.exports = CommonValidator
