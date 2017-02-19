const assertion = require('./assertion')
const async = require('async')
const dataValidator = require('../validators/data')

/*
    validate data
    get new assertion object
    validate json schema on assertion or validate using openbadges-validator
    send image to s3 if present
    save to database
*/
let issueNewBadge = (data) => {
  async.auto({
    // this function will just be passed a callback
    validateData: (callback) => {
      callback(dataValidator.validateAssertionData(data))
    },
    getNewAssertion: [ 'validateData', (results, callback) => {
      callback(null, assertion.create(data))
    } ],
    validateAssertion: [ 'getNewAssertion', (results, callback) => {

    }],
    s3: [ 'validateAssertion', (results, callback) => {

    } ],
    save: [ 's3', (results, callback) => {

    } ]
  }, (err, results) => {
    console.log(err)
    console.log(results)
  })
}
