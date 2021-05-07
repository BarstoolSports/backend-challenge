const request = require('supertest')
const querystring = require('querystring')
const { v4: uuid } = require('uuid')

class Agent {
  async start(app) {
    this.app = app.start()
  }

  client() {
    return request((req, res) => {
      this._requestHandler(req, res)
    })
  }

  async _requestHandler(req, res) {
    try {
      await this._lambdaHandler(req, res)
    } catch (err) {
      this._errorHandler(req, res, err)
    }
  }

  async _lambdaHandler(req, res) {
    const event = await buildEvent(req)
    const context = buildContext()
    const { statusCode, headers, body } = await this.app.server.run(event, context)
    res.writeHead(statusCode, headers)
    res.write(body)
    res.end()
  }

  _errorHandler(req, res, err) {
    res.writeHead(500, {
      'Content-Type': 'application/json'
    })
    res.write(
      JSON.stringify({
        status: 500,
        message: err.message
      })
    )
    res.end()
  }
}

async function buildEvent(req) {
  const url = new URL(req.url, 'http://localhost')
  const query = querystring.parse(url.search.slice(1))
  const body = await parseBody(req)

  return {
    path: url.pathname,
    httpMethod: req.method,
    headers: req.headers,
    body: body,
    queryStringParameters: query,
    isBase64Encoded: false
  }
}

function buildContext() {
  return {
    functionName: 'nodeHttpServer',
    awsRequestId: uuid()
  }
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (data) => (body += data.toString('utf8')))
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

request.Test.prototype.promise = async function () {
  const { body } = await new Promise((resolve, reject) => {
    this.end((err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
  return body
}

module.exports = new Agent()
