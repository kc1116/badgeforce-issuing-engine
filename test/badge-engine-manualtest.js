const badgeEngine = require('../badge/badge-engine')
const identity = require('../badge/open-badge/identity')
const verify = require('../badge/open-badge/verify')
const path = require('path')

let recipient = identity.create({identity: 'khalil@gmail.com', type: 'email'})
let verifyObj = verify.create({type: 'hosted', url: 'https://khalil.com'})
let fullpath = path.join(__dirname, '/gopher.png')
var data = {
  recipient: recipient,
  verify: verifyObj,
  badge: 'https://badge.com',
  options: {
    image: {
      type: 'file',
      image: fullpath
    }
  }
}

badgeEngine.issueNewBadge(data)

/* describe('Openbadges validator wrapper test suite', function () {
  it('Validate verify object with good data', function () {
    let recipient = identity.create({identity: 'khalil@gmail.com', type: 'email'})
    let verifyObj = verify.create({type: 'hosted', url: 'https://khalil.com'})
    var data = {
      recipient: recipient,
      verify: verifyObj,
      badge: 'https://badge.com'
    }

    badgeEngine.issueNewBadge(data)
    // assert.equal(true, _.isEmpty(dataValidator.validateVerify(verifyObj)))
  })
}) */
