const { MongoClient, ReadPreference } = require('mongodb')
const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)

const ReadyStates = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3
}

/**
 * @class MongoDB
 */
class MongoDB {
  /**
   * @param {MongooseSchema} Schema
   */
  get Schema() {
    return mongoose.Schema
  }

  /**
   * @param {Object} READY_STATES
   */
  get ReadyStates() {
    return ReadyStates
  }

  /**
   * @param {Number} readyState
   */
  get readyState() {
    return mongoose.connection.readyState
  }

  get connectionUri() {
    return process.env.MONGODB_URI || 'mongodb://localhost/test'
  }

  get connectionDb() {
    return process.env.MONGODB_DB || 'barstool-backend-challenge'
  }

  get connnectionOptions() {
    return {
      ssl: process.env.MONGODB_SSL === 'true',
      poolSize: 1,
      readPreference: ReadPreference.PRIMARY_PREFERRED,
      keepAlive: 1000,
      autoReconnect: true,
      reconnectInterval: 250,
      reconnectTries: Number.MAX_VALUE,
      connectTimeoutMS: 360000,
      socketTimeoutMS: 360000,
      validateOptions: true,
      useNewUrlParser: true,
      promiseLibrary: Promise
    }
  }

  /**
   * @method connect
   * @return {Promise}
   */
  connect() {
    return new Promise((resolve, reject) => {
      if (this.readyState > 0) {
        const error = new Error('MongoDB - already connecting/connected')
        return reject(error)
      }

      mongoose.connect(this.connectionUri, {
        ...this.connnectionOptions,
        dbName: this.connectionDb
      })

      mongoose.connection.once('open', () => {
        console.log('MongoDB: connected')
        resolve()
      })

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB: error', err)
        reject(err)
      })
    })
  }

  /**
   * @method disconnect
   * @return {Promise}
   */
  async disconnect() {
    return mongoose.connection.close()
  }

  /**
   * @method createModel
   * @return {MongooseModel}
   */
  createModel() {
    return mongoose.model(...arguments)
  }

  /**
   * @method createModel
   * @return {Promise}
   */
  async createConnection(uri = this.connectionUri, options = this.connnectionOptions) {
    const client = new MongoClient(uri, options)
    await client.connect()
    return {
      client,
      db: client.db(options.dbName)
    }
  }
}

module.exports = new MongoDB()
