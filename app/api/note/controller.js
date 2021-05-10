const noteService = require('app/modules/note')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const notes = await noteService.find({ user: req.params.id })
  res.status(200).send(notes)
}

/**
 * @method create
 */
exports.create = async (req, res) => {
  const note = await noteService.create(Object.assign(req.body, { user: req.userId }))
  res.status(200).send(note)
}
