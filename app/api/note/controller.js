const noteService = require('app/modules/notes')

/**
 * @method findByUserId
 * @description Finds notes by user ID.
 * @param {Object} req - The request object containing
 * userId, limit, page, sort and search query parameters.
 * @returns {Promise<void>} - The response object of notes for that userId.
 */
exports.findByUserId = async (req, res) => {
    const userId = req.params.id
    const { page, limit, sort, search } = req.query
    const user = await noteService.findByUserId(
        userId,
        {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            sort: sort || '-createdAt',
            search: search || ''
        }
    )
    res.status(200).send(user)
}
  
/**
/**
 * @method saveNote
 * @description Saves a new note for a user.
 * @param {Object} note - The note object containing the title, userId and message.
 * @returns {Promise<Object>} - The saved note object.
 */
exports.saveNote = async (req, res) => {
    const request = {
        userId: req.body.userId,
        title: req.body.title,
        message: req.body.message

    }
    const note = await noteService.saveNote(request);
    res.status(200).send(note);
}