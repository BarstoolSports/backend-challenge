process.env.NODE_ENV = 'test'
process.env.MONGODB_DB = 'barstool-backend-challenge'
process.env.MONGODB_URI = 'mongodb://localhost/test'

require('app-module-path').addPath(`${__dirname}/../`)

before(async () => {
  // Clear test db
  await require('test/lib/mock-db').reset()

  // Start the app and wrap the server with supertest
  await require('test/lib/agent').start(require('app'))
})

require('require-directory')(module)
