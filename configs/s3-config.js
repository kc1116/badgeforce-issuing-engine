const path = require('path')
let AWS = require('aws-sdk')
let fullpath = path.join(__dirname, '/s3-config.json')
AWS.config.loadFromPath(fullpath)

let getAWSConfig = () => {
  return AWS.config
}

module.exports = {
  getAWSConfig: getAWSConfig
}
