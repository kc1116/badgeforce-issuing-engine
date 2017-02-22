const assertion = require('./assertion')
const async = require('async')
const dataValidator = require('../validators/data')
const obvalidator = require('../validators/schema')
const s3Utils = require('../s3/s3-utils')

/*
    validate data
    get new assertion object
    validate json schema on assertion or validate using openbadges-validator
    send image to s3 if present
    save to database
*/
let issueNewBadge = (data) => {
  async.auto({
    validateData: (callback) => {
      callback(dataValidator.validateAssertionData(data))
    },
    s3UploadImage: [ 'validateData', (results, callback) => {
      (data.options.image) ? s3Utils.uploadAssertionImage(data.options.image.image, callback) : callback()
    }],
    getNewAssertion: [ 's3UploadImage', (results, callback) => {
      if (results.s3UploadImage) {
        data.options.image.image = results.s3UploadImage.Location
      }
      callback(null, assertion.create(data))
    } ],
    validateAssertion: [ 'getNewAssertion', (results, callback) => {
      obvalidator.validateBadgeAssertion(results.getNewAssertion, callback)
    }]
    /* save: [ 's3UploadImage', (results, callback) => {

    }] */
  }, (err, results) => {
    console.log(err)
    console.log('Results: \n ', results.getNewAssertion)
  })
}

module.exports = {
  issueNewBadge: issueNewBadge
}
