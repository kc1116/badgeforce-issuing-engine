const alignment = require('./alignment')

class BadgeClass {
  constructor (name, description, image, criteria, issuer, options) {
    // required data for an BadgeClass
    this.name = name || null
    this.description = description || null
    this.image = image || null
    this.criteria = criteria || null
    this.issuer = issuer || null

    // optional BadgeClass data
    if (options.alignment) { this.alignment = options.alignment }
    if (options.tags) { this.tags = options.tags }
  }

  toObject () {
    return this
  }
}

let create = (data) => {
  if (data.options.alignment) {
    data.options.alignment = data.options.alignment.map(alignmentData => {
      return alignment.create(alignmentData)
    })
  }
  return new BadgeClass(data.name, data.description, data.image.image, data.criteria, data.issuer, data.options)
}

module.exports = {
  create: create
}
