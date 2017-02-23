class Verify {
  constructor (type, url) {
    this.type = type || null
    this.url = url || null
  }
}

let create = (data) => {
  return new Verify(data.type, data.url)
}

module.exports = {
  create: create,
  class: Verify
}
