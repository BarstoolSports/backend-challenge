const controller = require('./controller')
const auth = require('app/api/user/auth')
const validator = require('./validator')

module.exports = router => {
  router.get('/user/:id/notes', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await controller.read(req, res)
  })

  router.post('/notes', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await validator.create(req)
    await controller.create(req, res)
  })
}
