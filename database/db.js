const mongoose = require('mongoose')
const crypto = require('crypto')
mongoose.Promise = require('bluebird')
const Schema = mongoose.Schema
const dbURI = 'mongodb://badgeforce:badgeforce@localhost:27017/BadgeForce'
const dbOptions = {
  config: {
    autoIndex: true
  }
}
mongoose.set('debug', true)
const connection = mongoose.createConnection(dbURI, dbOptions)

// CONNECTION EVENTS NEEDS LOGGING
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI)
})

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected')
})

const assertionSchema = new Schema({
  uid: {type: String, required: true},
  recipient: {type: Schema.Types.Mixed, required: true},
  badge: {type: String, required: true},
  verify: {type: Schema.Types.Mixed, required: true},
  issuedOn: { type: Date, default: Date.now, required: true },
  image: String,
  evidence: String,
  expires: Date,
  system: {
    uid: {type: String, required: true, index: true},
    created_on: {type: Date, required: true}
  }
})

const badgeClassSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  criteria: {type: String, required: true},
  issuer: {type: String, required: true},
  alignment: Array,
  tags: Array,
  system: {
    uid: {type: String, required: true, index: true},
    name: {type: String, required: true, index: true, unique: true},
    created_on: {type: Date, required: true}
  }
})

const issuerSchema = new Schema({
  name: {type: String, required: true},
  url: {type: String, required: true},
  email: String,
  image: String,
  description: String,
  system: {
    uid: {type: String, required: true, index: true},
    name: {type: String, required: true, index: true, unique: [true, 'Issuer with this name already exists,']},
    created_on: {type: Date, required: true}
  }
})

const Assertion = connection.model('Assertion', assertionSchema, 'BadgeForceAssertions')
const BadgeClass = connection.model('BadgeClass', badgeClassSchema, 'BadgeForceBadgeClass')
const Issuer = connection.model('Issuer', issuerSchema, 'BadgeForceIssuers')

let saveNewAssertion = (assertion, callback) => {
  Assertion.create(assertion, callback)
}

let saveNewBadgeClass = (badgeClass, callback) => {
  BadgeClass.create(badgeClass, (error, results) => {
    if (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        callback('Badge Class with this name already exists: ' + badgeClass.name, results)
      } else {
        callback('Error creating badge class', results)
      }
    }
  })
}

let saveNewIssuer = (issuer, callback) => {
  Issuer.create(issuer, (error, results) => {
    if (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        callback('Issuer with this name already exists: ' + issuer.name, results)
      } else if (error) {
        callback('Error creating new issuer', results)
      }
    }
  })
}

let hash = (data) => {
  return crypto.createHash('md5').update(data).digest('hex')
}

module.exports = {
  models: {
    saveNewAssertion: saveNewAssertion,
    saveNewBadgeClass: saveNewBadgeClass,
    saveNewIssuer: saveNewIssuer
  },
  utils: {
    hash: hash
  }
}

