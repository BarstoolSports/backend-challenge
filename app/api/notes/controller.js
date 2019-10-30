const httpStatus = require('http-status-codes')
const notesService = require('app/modules/notes')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const notes = await notesService.find({user: req.params.id})
  res.status(httpStatus.OK).send(notes)
}

/**
 * @method update
 */
exports.create = async (req, res) => {
  const { title, message, user } = req.params
  await notesService.create({ title, message, user })
  res.status(httpStatus.OK).send({ title, message, user })
}
