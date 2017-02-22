class Alignment {
  constructor (name, url, description) {
    this.name = name || null
    this.url = url || null

    if (description) { this.description = description }
  }
}

let create = (data) => {
  return new Alignment(data.name, data.url, data.description)
}

module.exports = {
  create: create
}
