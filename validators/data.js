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
  if (!_.isEmpty(recipientErr)) {
    err['recipient'] = recipientErr
  }

  if (!data.badge || !validator.isURL(data.badge)) {
    err['badge'] = 'badge property is invalid or missing: ' + data.badge
  }

  let verifyErr = validateVerify(data.verify)
  if (!_.isEmpty(verifyErr)) {
    err['verify'] = verifyErr
  }

  if (data.options) {
    let options = data.options
    if (options.image) {
      if (options.image.type === 'url' && !validator.isURL(options.image)) {
        err['image'] = 'optional image url is invalid: ' + options.image.image
      } else if (options.image.type === 'file') {
        let imageErr = validateImage(options.image)
        if (!_.isEmpty(imageErr)) {
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
module.exports = {
  validateAssertionData: validateAssertionData,
  validateIdentity: validateIdentity,
  validateVerify: validateVerify,
  validateImage: validateImage
}
