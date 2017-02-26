const assert = require('assert')
const dataValidator = require('../validators/data')
const identity = require('../badge/open-badge/identity')
const verify = require('../badge/open-badge/verify')
const alignment = require('../badge/badge-class/alignment')
const _ = require('lodash')
const path = require('path')

// Test suite for verify object validation
describe('Data validator for verify object test suite', function () {
  // Test data validator for verify object
  it('Validate verify object with good data', function () {
    let verifyObj = verify.create({type: 'hosted', url: 'https://khalil.com'})
    assert.equal(true, _.isEmpty(dataValidator.validateVerify(verifyObj)))
  })
  it('Validate verify object passing null', function () {
    let verifyObj = null
    let err = dataValidator.validateVerify(verifyObj)
    assert.equal('verify object missing', err.missing)
  })
  it('Validate verify object with missing type', function () {
    let verifyObj = verify.create({url: 'https://khalil.com'})
    let err = dataValidator.validateVerify(verifyObj)
    assert.equal('verify type is missing or invalid, hosted or signed is supported: ' + verifyObj.type, err.type)
  })
  it('Validate verify object with bad type', function () {
    let verifyObj = verify.create({type: 'bad', url: 'https://khalil.com'})
    let err = dataValidator.validateVerify(verifyObj)
    assert.equal('verify type is missing or invalid, hosted or signed is supported: ' + verifyObj.type, err.type)
  })
  it('Validate verify object with missing url', function () {
    let verifyObj = verify.create({type: 'bad'})
    let err = dataValidator.validateVerify(verifyObj)
    assert.equal('verify url is missing or invalid: ' + verifyObj.url, err.url)
  })
  it('Validate verify object with bad url', function () {
    let verifyObj = verify.create({type: 'hosted', url: 'bad'})
    let err = dataValidator.validateVerify(verifyObj)
    assert.equal('verify url is missing or invalid: ' + verifyObj.url, err.url)
  })
})

describe('Data validator for identity object test suite', function () {
  it('Validate identity object with good data', function () {
    let recipient = identity.create({identity: 'khalil@gmail.com', type: 'email'})
    assert.equal(true, _.isEmpty(dataValidator.validateIdentity(recipient)))
  })
  it('Validate identity object passing null', function () {
    let recipient = null
    let err = dataValidator.validateIdentity(recipient)
    assert.equal('identity object missing', err.missing)
  })
  it('Validate identity object with missing identity', function () {
    let recipient = identity.create({type: 'email'})
    let err = dataValidator.validateIdentity(recipient)
    assert.equal('email for identity missing or invalid: ' + recipient.identity, err.identity)
  })
  it('Validate identity object with bad identity', function () {
    let recipient = identity.create({identity: 'khalil claybon', type: 'email'})
    let err = dataValidator.validateIdentity(recipient)
    assert.equal('email for identity missing or invalid: ' + recipient.identity, err.identity)
  })
  it('Validate identity object with missing type', function () {
    let recipient = identity.create({identity: 'khalil claybon'})
    let err = dataValidator.validateIdentity(recipient)
    assert.equal('identity type missing or invalid, email is only supported type: ' + recipient.type, err.type)
  })
  it('Validate identity object with bad type', function () {
    let recipient = identity.create({identity: 'khalil claybon', type: 'bad'})
    let err = dataValidator.validateIdentity(recipient)
    assert.equal('identity type missing or invalid, email is only supported type: ' + recipient.type, err.type)
  })
})

describe('Data validator for assertion object test suite', function () {
  it('Validate assertion object with good data', function () {
    let recipient = identity.create({identity: 'khalil@gmail.com', type: 'email'})
    let verifyObj = verify.create({type: 'hosted', url: 'https://khalil.com'})
    var data = {
      recipient: recipient,
      verify: verifyObj,
      badge: 'https://badge.com'
    }
    assert.equal(true, _.isEmpty(dataValidator.validateAssertionData(data)))
  })
  it('Validate assertion object passing null', function () {
    let data = null
    let err = dataValidator.validateAssertionData(data)
    assert.equal('assertion data missing', err.missing)
  })
  it('Validate assertion object with missing badge', function () {
    let recipient = identity.create({identity: 'khalil@gmail.com', type: 'email'})
    let data = {recipient: recipient}
    let err = dataValidator.validateAssertionData(data)
    assert.equal('badge property is invalid or missing: ' + data.badge, err.badge)
  })
  it('Validate assertion object with unaccepted optional image file type', function () {
    let recipient = identity.create({identity: 'khalil@gmail.com', type: 'email'})
    let verifyObj = verify.create({type: 'hosted', url: 'https://khalil.com'})
    let fullpath = path.join(__dirname, '/me.jpg')
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
    let err = dataValidator.validateAssertionData(data)
    assert.equal('image type is not accepted: image/jpeg', err.image.invalid)
  })
  it('Validate assertion object with accepted optional image file type', function () {
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
    let err = dataValidator.validateAssertionData(data)
    assert.equal(null, err)
  })
})

describe('Data validator for alignment object test suite', function () {
  it('Validate alignment object with good data', function () {
    let data = {
      'name': 'New Alignment',
      'url': 'https://newalignment.com',
      'options': {
        'description': 'This is a description'
      }
    }
    assert.equal(true, _.isEmpty(dataValidator.validateAlignmentData(data)))
  })
  it('Validate alignment object with missing data', function () {
    let data = null
    assert.equal('alignment data is missing', dataValidator.validateAlignmentData(data).missing)
  })
  it('Validate alignment object with missing name', function () {
    let data = {
      'url': 'https://newalignment.com',
      'options': {
        'description': 'This is a description'
      }
    }
    assert.equal('alignment name is missing', dataValidator.validateAlignmentData(data).name)
  })
  it('Validate alignment object with missing url', function () {
    let data = {
      'name': 'This is a name',
      'options': {
        'description': 'This is a description'
      }
    }
    assert.equal('alignment url is missing', dataValidator.validateAlignmentData(data).url)
  })
})

describe('Data validator for badge class object test suite', function () {
  it('Validate badge class object with good data', function () {
    let data = {
      'name': 'New Badge Class',
      'description': 'Beautiful badge class',
      'image': 'https://google.com/gopher.png',
      'criteria': 'https://google.com',
      'issuer': 'https://google.com/issuer',
      'alignment': [
        {
          'name': 'New Alignment',
          'url': 'https://newalignment.com',
          'options': {
            'description': 'This is a description'
          }
        }
      ],
      'options': {
        'description': 'This is a description'
      }
    }
    assert.equal(true, _.isEmpty(dataValidator.validateBadgeClassData(data)))
  })
  it('Validate badge class object with missing data', function () {
    let data = null
    assert.equal('badge class data is missing', dataValidator.validateBadgeClassData(data).missing)
  })
  it('Validate badge class object with  missing name', function () {
    let data = {
      'description': 'Beautiful badge class',
      'image': 'https://google.com/gopher.png',
      'criteria': 'https://google.com',
      'issuer': 'https://google.com/issuer',
      'alignment': [
        {
          'name': 'New Alignment',
          'url': 'https://newalignment.com',
          'options': {
            'description': 'This is a description'
          }
        }
      ]
    }
    assert.equal('badge class name is missing', dataValidator.validateBadgeClassData(data).name)
  })
  it('Validate badge class object with missing description', function () {
    let data = {
      'name': 'New Badge Class',
      'image': 'https://google.com/gopher.png',
      'criteria': 'https://google.com',
      'issuer': 'https://google.com/issuer',
      'alignment': [
        {
          'name': 'New Alignment',
          'url': 'https://newalignment.com',
          'options': {
            'description': 'This is a description'
          }
        }
      ]
    }
    assert.equal('badge class description is missing', dataValidator.validateBadgeClassData(data).description)
  })
  it('Validate badge class object with missing image', function () {
    let data = {
      'name': 'New Badge Class',
      'description': 'This is a description',
      'criteria': 'https://google.com',
      'issuer': 'https://google.com/issuer',
      'alignment': [
        {
          'name': 'New Alignment',
          'url': 'https://newalignment.com',
          'options': {
            'description': 'This is a description'
          }
        }
      ]
    }
    assert.equal('badge class image is missing', dataValidator.validateBadgeClassData(data).image)
  })
  it('Validate badge class object with invalid image url', function () {
    let data = {
      'name': 'New Badge Class',
      'description': 'This is a description',
      'criteria': 'https://google.com',
      'issuer': 'https://google.com/issuer',
      'image': {
        'image': 'bad',
        'type': 'url'
      },
      'alignment': [
        {
          'name': 'New Alignment',
          'url': 'https://newalignment.com',
          'options': {
            'description': 'This is a description'
          }
        }
      ]
    }
    assert.equal('badge class image url is invalid: ' + data.image.image, dataValidator.validateBadgeClassData(data).image)
  })
  it('Validate badge class object with missing criteria', function () {
    let data = {
      'name': 'New Badge Class',
      'image': 'https://google.com/gopher.png',
      'issuer': 'https://google.com/issuer',
      'alignment': [
        {
          'name': 'New Alignment',
          'url': 'https://newalignment.com',
          'options': {
            'description': 'This is a description'
          }
        }
      ]
    }
    assert.equal('badge class criteria is invalid or missing', dataValidator.validateBadgeClassData(data).criteria)
  })
  it('Validate badge class object with missing issuer', function () {
    let data = {
      'name': 'New Badge Class',
      'image': 'https://google.com/gopher.png',
      'criteria': 'https://google.com',
      'alignment': [
        {
          'name': 'New Alignment',
          'url': 'https://newalignment.com',
          'options': {
            'description': 'This is a description'
          }
        }
      ]
    }
    assert.equal('badge class issuer is invalid or missing', dataValidator.validateBadgeClassData(data).issuer)
  })
})
