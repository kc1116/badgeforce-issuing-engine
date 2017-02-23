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
}

let create = (data) => {
  return new BadgeClass(data.name, data.description, data.image, data.criteria, data.issuer, data.options)
}

module.exports = {
  create: create
}
