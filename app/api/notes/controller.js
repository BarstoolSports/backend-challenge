const httpStatus = require('http-status-codes')
const notesService = require('app/modules/notes')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const notes = await notesService.find({userId: req.params.id})
  res.status(httpStatus.OK).send(notes)
}

/**
 * @method create
 */
exports.create = async (req, res) => {
  const { title, message, userId } = req.body
  await notesService.create({ title, message, userId })
  res.status(httpStatus.OK).send({ title, message, userId })
}
