const httpStatus = require('http-status-codes')
const mongodb = require('app/lib/mongodb')
const { ServiceUnavailableError } = require('app/lib/errors')

exports.currentStatus = function(req, res) {
  if (!mongodb.readyState) throw new ServiceUnavailableError()
  res.status(httpStatus.OK).send({
    status: 'OK'
  })
}
