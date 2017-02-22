const uuidV4 = require('uuid/v4')

class Assertion {
  constructor (uid, recipient, badge, verify, options) {
    // required data for an assertion
    this.uid = uid || null
    this.recipient = recipient || null
    this.badge = badge || null
    this.verify = verify || null
    this.issuedOn = new Date().toISOString()

    // optional assertion data
    if (options) {
      if (options.image) { this.image = options.image.image };
      if (options.evidence) { this.evidence = options.evidence };
      if (options.expires) { this.expires = options.expires };
    }
  }
}

let create = (data) => {
  let uid = uuidV4()

  // TODO construct proper badge identity object pass it to contructor as recipient
  return new Assertion(uid, data.recipient, data.badge, data.verify, data.options)
}
module.exports = {
  create: create
}
