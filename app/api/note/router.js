const controller = require('./controller')
const validator = require('./validator')
const auth = require('./auth')

module.exports = (router) => {
  router.post('/note', async (req, res) => {
    await auth.requiresLogin(req)
    await validator.create(req)
    await controller.create(req, res)
  })
}
