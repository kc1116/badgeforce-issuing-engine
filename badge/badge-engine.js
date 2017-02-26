const async = require('async')
const dataValidator = require('../validators/data')
const obvalidator = require('../validators/schema')
const s3Utils = require('../s3/s3-utils')
const models = require('../database/db').models
const assertion = require('./open-badge/assertion')
const badgeclass = require('./badge-class/badge-class')
const issuer = require('./open-badge/issuer')
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
    }],
    /* validateAssertion: [ 'getNewAssertion', (results, callback) => {
      console.log(results.getNewAssertion)
      obvalidator.validateBadgeAssertion(results.getNewAssertion, callback)
    }], */
    save: [ 'getNewAssertion', (results, callback) => {
      models.saveNewAssertion(results.getNewAssertion.toObject(), callback)
    }]
  }, (err, results) => {
    console.log('Error: \n', err)
    console.log('Results: \n ', results.save)
  })
}

let createNewBadgeClass = (data) => {
  async.auto({
    validateData: (callback) => {
      callback(dataValidator.validateBadgeClassData(data))
    },
    s3UploadImage: [ 'validateData', (results, callback) => {
      (data.image.type === 'file') ? s3Utils.uploadBadgeClassImage(data.image.image, callback) : callback()
    }],
    getNewBadgeClass: [ 's3UploadImage', (results, callback) => {
      if (results.s3UploadImage) {
        data.image.image = results.s3UploadImage.Location
      }
      callback(null, badgeclass.create(data))
    } ],
    save: [ 'getNewBadgeClass', (results, callback) => {
      models.saveNewBadgeClass(results.getNewBadgeClass.toObject(), callback)
    }]
  }, (err, results) => {
    console.log(err)
    console.log('Results: \n ', results.save)
  })
}

let createNewIssuer = (data) => {
  async.auto({
    validateData: (callback) => {
      callback(dataValidator.validateIssuerData(data))
    },
    s3UploadImage: [ 'validateData', (results, callback) => {
      (data.options.image.type === 'file') ? s3Utils.uploadIssuerImage(data.options.image.image, callback) : callback()
    }],
    getNewIssuer: [ 's3UploadImage', (results, callback) => {
      if (results.s3UploadImage) {
        data.options.image.image = results.s3UploadImage.Location
      }
      callback(null, issuer.create(data))
    } ],
    save: [ 'getNewIssuer', (results, callback) => {
      models.saveNewIssuer(results.getNewIssuer.toObject(), callback)
    }]
  }, (err, results) => {
    console.log(err)
    console.log('Results: \n ', results)
  })
}
module.exports = {
  issueNewBadge: issueNewBadge,
  createNewBadgeClass: createNewBadgeClass,
  createNewIssuer: createNewIssuer
}
