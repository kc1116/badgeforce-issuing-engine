const obvalidator = require('openbadges-validator')

let validateBadgeAssertion = (assertion, callback) => {
  obvalidator(assertion, function (err, data) {
    callback(err, data)
  })
}

module.exports = {
  validateBadgeAssertion: validateBadgeAssertion
}
