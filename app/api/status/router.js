const controller = require('./controller')

module.exports = (router) => {
  router.get('/status', async (req, res) => {
    await controller.currentStatus(req, res)
  })
}
