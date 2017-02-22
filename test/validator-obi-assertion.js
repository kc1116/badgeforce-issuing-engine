/* const obvalidator = require('../validators/schema')
let testAssertion = {
  '@context': 'https://w3id.org/openbadges/v1',
  'type': 'Assertion',
  'id': 'https://example.org/assertion/1',
  'uid': 'd3c4ff',
  'recipient': {
    'identity': 'sha256$8f0e05590e2335853044e4ec212978013a9a416a4a711a0813ce1f97574e4d54',
    'salt': 'seasalt',
    'hashed': true,
    'type': 'email'
  },
  'verify': {
    'type': 'hosted',
    'url': 'https://example.org/1.1/assertion'
  },
  'badge': 'https://example.org/1.1/badge',
  'issuedOn': '2013-02-18T18:10+0500',
  'image': 'https://example.org/assertion-image',
  'evidence': 'https://example.org/evidence',
  'expires': '2014-02-18T18:10+0500',
  'myExtension': {
    '@context': 'https://example.org/1.1/MyExtension/context.json',
    'type': [
      'Extension',
      'extensions:MyExtension'
    ],
    'myBoolean': true,
    'myInteger': 2,
    'myString': 'foo',
    'myObject': {
      'myProperty': 'myValue'
    },
    'myOptionalString': 'bar'
  }
}
obvalidator.validateBadgeAssertion(testAssertion, (err, data) => {
  console.log('HERE')
  console.log(err)
  console.log(data)
}) */
// Test suite for verify object validation
/* describe('Openbadges validator wrapper test suite', function () {
  it('Validate verify object with good data', function () {
    let testAssertion = {
      '@context': 'https://w3id.org/openbadges/v1',
      'type': 'Assertion',
      'id': 'https://example.org/assertion/1',
      'uid': 'd3c4ff',
      'recipient': {
        'identity': 'sha256$8f0e05590e2335853044e4ec212978013a9a416a4a711a0813ce1f97574e4d54',
        'salt': 'seasalt',
        'hashed': true,
        'type': 'email'
      },
      'verify': {
        'type': 'hosted',
        'url': 'https://example.org/1.1/assertion'
      },
      'badge': 'https://example.org/1.1/badge',
      'issuedOn': '2013-02-18T18:10+0500',
      'image': 'https://example.org/assertion-image',
      'evidence': 'https://example.org/evidence',
      'expires': '2014-02-18T18:10+0500',
      'myExtension': {
        '@context': 'https://example.org/1.1/MyExtension/context.json',
        'type': [
          'Extension',
          'extensions:MyExtension'
        ],
        'myBoolean': true,
        'myInteger': 2,
        'myString': 'foo',
        'myObject': {
          'myProperty': 'myValue'
        },
        'myOptionalString': 'bar'
      }
    }
    obvalidator.validateBadgeAssertion(testAssertion, (err, data) => {
      console.log('HERE')
      console.log(err)
      console.log(data)
    })
    // assert.equal(true, _.isEmpty(dataValidator.validateVerify(verifyObj)))
  })
}) */
