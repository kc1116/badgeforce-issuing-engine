const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Schema = mongoose.Schema
const dbURI = 'mongodb://badgeforce:badgeforce@localhost:27017/BadgeForce'
const dbOptions = {
  config: {
    autoIndex: false
  }
}
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
  badge: String,
  verify: {type: Schema.Types.Mixed, required: true},
  issuedOn: { type: Date, default: Date.now, required: true },
  image: String,
  evidence: String,
  expires: Date
})

const badgeClassSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  criteria: {type: String, required: true},
  issuer: {type: String, required: true},
  alignment: Array,
  tags: Array
})

const Assertion = connection.model('Assertion', assertionSchema)
const BadgeClass = connection.model('BadgeClass', badgeClassSchema)

let saveNewAssertion = (assertion, callback) => {
  Assertion.create(assertion, callback)
}

let saveNewBadgeClass = (badgeClass, callback) => {
  BadgeClass.create(badgeClass, callback)
}

module.exports = {
  models: {
    saveNewAssertion: saveNewAssertion,
    saveNewBadgeClass: saveNewBadgeClass
  }
}

