const badgeEngine = require('../badge/badge-engine')
const identity = require('../badge/open-badge/identity')
const verify = require('../badge/open-badge/verify')
const path = require('path')

/* let recipient = identity.create({identity: 'khalil@gmail.com', type: 'email'})
let verifyObj = verify.create({type: 'hosted', url: 'https://khalil.com'})
let fullpath = path.join(__dirname, '/gopher.png')
var data = {
  recipient: recipient,
  verify: verifyObj,
  badge: 'https://s3.amazonaws.com/just-a-test-badgeforce/test-badge-class.json',
  options: {
    image: {
      type: 'file',
      image: fullpath
    }
  }
}

badgeEngine.issueNewBadge(data)
*/
/* let data = {
  'name': 'New Badge Class',
  'description': 'Beautiful badge class',
  'image': {
    'image': 'https://google.com/gopher.png',
    'type': 'url'
  },
  'criteria': 'https://google.com',
  'issuer': 'https://google.com/issuer',
  'options': {
    'alignment': [
      {
        'name': 'New Alignment',
        'url': 'https://newalignment.com',
        'options': {
          'description': 'This is a description'
        }
      }
    ],
    'tags': ['this', 'is', 'a', 'test']
  }
}
badgeEngine.createNewBadgeClass(data)
*/

let issuerData = {
  name: 'BadgeForce Issuer',
  url: 'https://badgeforce.io',
  options: {
    email: 'engineering@badgeforce.io',
    image: {
      image: path.join(__dirname, '/gopher.png'),
      type: 'file'
    },
    description: 'The best issuer ever.'
  }
}
badgeEngine.createNewIssuer(issuerData)
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

