const uuidV4 = require('uuid/v4')
const pk = require('../../database/db').utils
const jwt = require('jsonwebtoken')

class Assertion {
  constructor (uid, recipient, badge, verify, issuer, options) {
    // required data for an assertion
    this.uid = uid || null
    this.recipient = recipient || null
    this.badge = badge || null
    this.verify = verify || null
    this.issuedOn = new Date().toISOString()
    this.system = {
      issuer: issuer,
      uid: uid,
      created_on: new Date().toISOString()
    }
    // optional assertion data
    if (options) {
      if (options.image) { this.image = options.image.image };
      if (options.evidence) { this.evidence = options.evidence };
      if (options.expires) { this.expires = options.expires };
    }
  }

  toObject () {
    return this
  }
}

let create = (data, callback) => {
  let uid = uuidV4()
  // TODO construct proper badge identity object pass it to contructor as recipient
  let assertion = new Assertion(uid, data.recipient, data.badge, data.verify, data.issuer, data.options)
  if (data.options.signAssertion) {
    assertion.verify = 'https://sample.com/issuer/key'
    signAssertion(assertion, callback)
  } else {
    callback(null, assertion)
  }
}

let signAssertion = (assertion, callback) => {
  pk.getIssuerPrivateKey(assertion.system.issuer, (err, pem) => {
    if (err) { callback(err, null) }
    let sPayload = Object.assign({}, assertion)
    delete sPayload['system']
    jwt.sign(sPayload, pem.privatekeypem, { algorithm: 'RS256' }, function (err, token) {
      assertion.signature = token
      callback(err, assertion)
    })
  })
}

let verifySignedAssertion = (signedAssertion, issuer, callback) => {
  pk.getIssuerPublicKey(issuer, (err, pem) => {
    if (err) {
      callback(err, null)
    }
    jwt.verify(signedAssertion, pem.publickeypem, callback)
  })
}

module.exports = {
  create: create,
  signAssertion: signAssertion,
  verifySignedAssertion: verifySignedAssertion
}
