const controller = require('./controller')
const validator = require('./validator')

module.exports = (router) => {
  router.post('/auth/register', async (req, res) => {
    await validator.register(req)
    await controller.register(req, res)
  })

  router.post('/auth/login', async (req, res) => {
    await validator.login(req)
    await controller.login(req, res)
  })
}
