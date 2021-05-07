require('app-module-path').addPath('./')

const app = require('app').start()

// Export http handler
exports.handler = async function (event, context) {
  return await app.server.run(event, context)
}
