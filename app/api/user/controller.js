const userService = require('app/modules/user')
const noteService = require('app/modules/note')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const user = await userService.findById(req.params.id)
  res.status(200).send(user)
}

/**
 * @method update
 */
exports.update = async (req, res) => {
  const user = await userService.readAndUpdate(req.params.id, req.body)
  res.status(200).send(user)
}

/**
 * @method listNotes
 */
exports.listNotes = async (req, res) => {
  const notes = await noteService.findAllByUserId(req.params.id)
  res.status(200).send(notes)
}
