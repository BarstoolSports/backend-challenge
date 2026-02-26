const MongoDB = require('app/lib/mongodb')

// Gets readyState from mongoose connection and returns status of the service
// If readyState is 1, then the api returns 200 else 503
// Response format: the key value of readyState is returned as status in the response body
exports.currentStatus = function (req, res) {
  // Finds the key name of the readyState value
  const status = Object.keys(MongoDB.ReadyStates).find(key => MongoDB.ReadyStates[key] === MongoDB.readyState);
  if (MongoDB.readyState !== 1) {
    return res.status(503).send({
      status: status
    })
  }
  res.status(200).send({
    status: status
  })
}
