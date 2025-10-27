const mongodb = require('app/lib/mongodb')

exports.currentStatus = function (req, res) {
  const { readyState, ReadyStates } = mongodb

  const isDbConnected = readyState === ReadyStates.connected

  if (isDbConnected) {
    return res.status(200).send({
      status: 'OK'
    })
  }

  const statusMsg =
    {
      [ReadyStates.connecting]: 'db connecting',
      [ReadyStates.disconnected]: 'db disconnected',
      [ReadyStates.disconnecting]: 'db disconnecting'
    }[readyState] || 'Internal Server Error'

  return res.status(500).send({
    status: statusMsg
  })
}
