const validator = require('validator')
const _ = require('lodash')

const readChunk = require('read-chunk')
const imageType = require('image-type')
const ACCEPTED_IMAGE_TYPES = ['image/png']
// const http = require('http')

let validateAssertionData = (data) => {
  var err = {}

  if (!data) {
    err['missing'] = 'assertion data missing'
    return err
  }

  let recipientErr = validateIdentity(data.recipient)
  if (recipientErr) {
    err['recipient'] = recipientErr
  }

  if (!data.badge || !validator.isURL(data.badge)) {
    err['badge'] = 'badge property is invalid or missing: ' + data.badge
  }

  let verifyErr = validateVerify(data.verify)
  if (verifyErr) {
    err['verify'] = verifyErr
  }

  if (data.options) {
    let options = data.options
    if (options.image) {
      if (options.image.type === 'url' && !validator.isURL(options.image)) {
        err['image'] = 'optional image url is invalid: ' + options.image.image
      } else if (options.image.type === 'file') {
        let imageErr = validateImage(options.image)
        if (imageErr) {
          err['image'] = imageErr
        }
      } else {
        err['image'] = 'optional image is invalid: ' + options.image.image
      }
    }
    if (options.evidence && !validator.isURL(options.evidence)) {
      err['evidence'] = 'optional evidence url is invalid: ' + options.evidence
    }
    if (options.expires && !validator.isDate(options.expires)) {
      err['expires'] = 'optional expires date is invalid: ' + options.expires
    }
  }

  if (_.isEmpty(err)) {
    return null
  }

  return err
}

let validateBadgeClassData = (data) => {
  var err = {}

  if (!data) {
    err['missing'] = 'badge class data is missing'
    return err
  }

  if (!data.name) {
    err['name'] = 'badge class name is missing'
  }

  if (!data.description) {
    err['description'] = 'badge class description is missing'
  }

  if (!data.image) {
    err['image'] = 'badge class image is missing'
  } else {
    if (data.image.type === 'url' && !validator.isURL(data.image.image)) {
      err['image'] = 'badge class image url is invalid: ' + data.image.image
    } else if (data.image.type === 'file') {
      let imageErr = validateImage(data.image.image)
      if (imageErr) {
        err['image'] = imageErr
      }
    }
  }

  if (!data.criteria || !validator.isURL(data.criteria)) {
    err['criteria'] = 'badge class criteria is invalid or missing'
  }

  if (!data.issuer || !validator.isURL(data.issuer)) {
    err['issuer'] = 'badge class issuer is invalid or missing'
  }

  if (data.options) {
    if (data.options.alignment) {
      let alignmentErrs = []
      _.forEach(data.options.alignment, alignmentObj => {
        let alignmentObjErr = validateAlignmentData(alignmentObj)
        if (alignmentObjErr) {
          alignmentErrs.push(alignmentObjErr)
        }
      })
      if (alignmentErrs.length > 0) {
        err['alignment'] = alignmentErrs
      }
    }
  }

  if (_.isEmpty(err)) {
    return null
  }

  return err
}

let validateIdentity = (identity) => {
  var err = {}
  if (!identity) {
    err['missing'] = 'identity object missing'
    return err
  }

  if (!identity.identity || !validator.isEmail(identity.identity)) {
    err['identity'] = 'email for identity missing or invalid: ' + identity.identity
  }

  if (!identity.type || identity.type !== 'email') {
    err['type'] = 'identity type missing or invalid, email is only supported type: ' + identity.type
  }

  if (_.isEmpty(err)) {
    return null
  }
  return err
}

let validateVerify = (verify) => {
  var err = {}
  if (!verify) {
    err['missing'] = 'verify object missing'
    return err
  }

  if (!verify.type || verify.type !== 'hosted' && verify.type !== 'signed') {
    err['type'] = 'verify type is missing or invalid, hosted or signed is supported: ' + verify.type
  }

  if (!verify.url || !validator.isURL(verify.url)) {
    err['url'] = 'verify url is missing or invalid: ' + verify.url
  }

  if (_.isEmpty(err)) {
    return null
  }
  return err
}

let validateImage = (image) => {
  let err = {}

  if (image.type === 'file') {
    let buffer = readChunk.sync(image.image, 0, 12)
    let type = imageType(buffer)
    if (_.indexOf(ACCEPTED_IMAGE_TYPES, type.mime) < 0) {
      err['invalid'] = 'image type is not accepted: ' + type.mime
    }
  }

  if (_.isEmpty(err)) {
    return null
  }
  return err
  /*
  if (image.type === 'url') {
    http.get(image.image, res => {
      res.once('data', chunk => {
        res.destroy()
        let type = imageType(chunk)
        // => {ext: 'gif', mime: 'image/gif'}
        if (!_.indexOf(ACCEPTED_IMAGE_TYPES, type.mime) > -1) {
          err['invalid'] = 'image type is not accepted: ' + type
        }
      })
    })
  } */
}

let validateAlignmentData = (alignment) => {
  var err = {}
  if (!alignment) {
    err['missing'] = 'alignment data is missing'
    return err
  }

  if (!alignment.name) {
    err['name'] = 'alignment name is missing'
  }

  if (!alignment.url || !validator.isURL(alignment.url)) {
    err['url'] = 'alignment url is missing'
  }

  if (_.isEmpty(err)) {
    return null
  }
  return err
}
module.exports = {
  validateAssertionData: validateAssertionData,
  validateIdentity: validateIdentity,
  validateVerify: validateVerify,
  validateImage: validateImage,
  validateBadgeClassData: validateBadgeClassData,
  validateAlignmentData: validateAlignmentData
}
