class Identity {
  constructor (identity, type, hashed, salt) {
    // required data for an identity
    this.identity = identity || null
    this.type = type || null

    // optional identity data
    if (hashed) { this.hashed = hashed }
  }
}

let create = (data) => {
  return new Identity(data.identity, data.type)
}

module.exports = {
  create: create
}
