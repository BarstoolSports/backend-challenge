const controller = require('./controller')
const auth = require('./auth')
const validator = require('./validator')

module.exports = (router) => {
  router.get('/user/:id', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await controller.read(req, res)
  })

  router.put('/user/:id', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await validator.update(req)
    await controller.update(req, res)
  })

  router.get('/user/:id/notes', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await controller.listNotes(req, res)
  })
}
