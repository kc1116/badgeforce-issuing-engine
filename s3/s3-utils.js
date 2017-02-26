const fs = require('fs')
const path = require('path')

let AWS = require('aws-sdk')
AWS.config = require('../configs/s3-config').getAWSConfig()
const s3 = new AWS.S3({apiVersion: '2006-03-01'})

let uploadAssertionImage = (file, callback) => {
  let uploadParams = {
    Bucket: 'just-a-test-badgeforce', // bucket needs to be from config file
    Key: '',
    Body: ''
  }

  let fileStream = fs.createReadStream(file)
  fileStream.on('error', (err) => {
    // logging will come later: Error uploading assertion image to s3
    console.log('File Error', err)
    callback(err, null)
  })

  uploadParams.Body = fileStream
  uploadParams.Key = path.basename(file)
  s3.upload(uploadParams, callback)
}

let uploadABadgeClassImage = (file, callback) => {
  let uploadParams = {
    Bucket: 'just-a-test-badgeforce', // bucket needs to be from config file
    Key: '',
    Body: ''
  }

  let fileStream = fs.createReadStream(file)
  fileStream.on('error', (err) => {
    // logging will come later: Error uploading assertion image to s3
    console.log('File Error', err)
    callback(err, null)
  })

  uploadParams.Body = fileStream
  uploadParams.Key = path.basename(file)
  s3.upload(uploadParams, callback)
}

module.exports = {
  uploadAssertionImage: uploadAssertionImage,
  uploadABadgeClassImage: uploadABadgeClassImage
}
