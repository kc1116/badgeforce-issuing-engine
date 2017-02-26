class Issuer {
  constructor (name, url, options) {
    this.name = name || null
    this.url = url || null

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
