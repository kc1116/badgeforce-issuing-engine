const assertion = require('./assertion')
const async = require('async')

const _getNewAssertion = (data)=>{
  return new assertion(data.uid, data.recipient, data.badge, data.options)   
}
/*
    validate data
    get new assertion object  
    validate json schema on assertion or validate using openbadges-validator
    send image to s3 if present 
    save to database 
*/

const issueNewBadge = (data)=> {
  async.auto({
    // this function will just be passed a callback
    validateData: TODO,
    getNewAssertion: [ 'validateData', (results, callback) => {
        
    } ], 
    validateAssertion: [ 'getNewAssertion', (results, callback) => {

    } ], 
    s3: [ 'validateAssertion', (results, callback) => {

    } ], 
    save: [ 's3', (results, callback) => {
        
    } ]
  }, (err, results)=>{
    console.log(err)
    console.log(results)
  })
}
