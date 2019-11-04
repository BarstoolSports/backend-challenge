const { BadRequestError } = require('app/lib/errors')

class CommonValidator {
  /**
   * @method validate
   */
  async validate(req) {
    const result = await req.getValidationResult()
    if (result.isEmpty()) return

    const error = result.array({ onlyFirstError: true })[0]
    const message = `${error.msg} for ${error.param} - ${error.value}`
    throw new BadRequestError(message)
  }
}

module.exports = CommonValidator
