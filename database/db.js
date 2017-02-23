const mongoose = require('mongoose')
const Schema = mongoose.Schema
// mongoose.createConnection('mongodb://user:pass@localhost:port/database', { config: { autoIndex: false } })

let assertionSchema = new Schema({
  uid: {type: String, required: true},
  recipient: {type: Schema.Types.Mixed, required: true},
  badge: String,
  verify: {type: Schema.Types.Mixed, required: true},
  issuedOn: { type: Date, default: Date.now, required: true },
  image: String,
  evidence: String,
  expires: Date
})

let badgeClassSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  criteria: {type: String, required: true},
  issuer: {type: String, required: true},
  alignment: String,
  tags: Array
})

let Assertion = mongoose.model('Assertion', assertionSchema)
let BadgeClass = mongoose.model('BadgeClass', badgeClassSchema)

let getNewAssertion = (assertion, callback) => {
  Assertion.create(assertion, callback)
}

let getNewBadgeClass = (badgeClass, callback) => {
  BadgeClass.create(badgeClass, callback)
}

module.exports = {
  models: {
    getNewAssertion: getNewAssertion,
    getNewBadgeClass: getNewBadgeClass
  }
}
