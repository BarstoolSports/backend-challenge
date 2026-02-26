const controller = require('./controller')
const auth = require('./auth')


module.exports = (router) => {
  router.post('/note', async (req, res) => {
    await auth.requiresLogin(req)
    await controller.saveNote(req, res)
  })

  router.get('/user/:id/notes', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await controller.findByUserId(req, res)
  })
}
