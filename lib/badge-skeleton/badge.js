var assertion = require('./assertion');

var getNewAssertion = (data) =>{
    return new assertion(data.uid, data.recipient, data.badge, data.verify, data.options);
}

/*
    validate data
    get new assertion object 
    validate json schema on assertion or validate using openbadges-validator
    send image to s3 if present 
    save to database 
*/