const validator = require('validator')
const _ = require('lodash')

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
    if (options.image && !validator.isURL(options.image)) {
      err['image'] = 'optional image url is invalid: ' + options.image
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

  return err
}

module.exports = {
  validateAssertionData: validateAssertionData,
  validateIdentity: validateIdentity,
  validateVerify: validateVerify
}
