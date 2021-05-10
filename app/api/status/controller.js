const mongodb = require('app/lib/mongodb')

exports.currentStatus = function (req, res) {
  if (mongodb.readyState === 1) {
    res.status(200).send({
      status: 'OK'
    })
  } else {
    res.status(500).send({
      status: 'Internal Server Error'
    })
  }
}
