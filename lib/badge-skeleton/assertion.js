class Assertion {
  constructor(uid, recipient, badge, verify, options) {

    //required data for an assertion 
    this.uid = uid || null;
    this.recipient = recipient || null;
    this.badge = badge || null;
    this.verify = verify || null;
    this.issuedOn = new Date().toISOString();

    //optional assertion data 
    if(options.image) {this.image = options.image};
    if(options.evidence) {this.evidence = options.evidence};
    if(options.expires) {this.expires = options.expires};
  }
}