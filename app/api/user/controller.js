const httpStatus = require('http-status-codes')
const userService = require('app/modules/user')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const user = await userService.findById(req.params.id)
  res.status(httpStatus.OK).send(user)
}

/**
 * @method update
 */
exports.update = async (req, res) => {
  const user = await userService.readAndUpdate(req.params.id, req.body)
  res.status(httpStatus.OK).send(user)
}
