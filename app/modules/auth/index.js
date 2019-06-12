const Model = require('./model')
const Service = require('./service')

const model = new Model('Auth')
const service = new Service(model)

module.exports = service
