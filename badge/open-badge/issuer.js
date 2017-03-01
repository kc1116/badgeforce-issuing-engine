const uuidV4 = require('uuid/v4')
const dbUtils = require('../../database/db').utils
class Issuer {
  constructor (name, url, options) {
    this.name = name || null
    this.url = url || null
    this.system = {
      name: dbUtils.hash(name),
      uid: uuidV4(),
      created_on: new Date().toISOString()
    }
    if (options.description) { this.description = options.description }
    if (options.image) { this.image = options.image.image }
    if (options.email) { this.email = options.email }
  }

  toObject () {
    return this
  }
}

let create = (data) => {
  return new Issuer(data.name, data.url, data.options)
}

module.exports = {
  create: create
}
