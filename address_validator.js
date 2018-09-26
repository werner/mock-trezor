export class AddressValidator {

  constructor () {
    this.errorMessage = '';
  }

  normalize(s) {  
    let x = String(s) || '';
    return x.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
  }

  check(s) {
    
    if (s.length < 26 || s.length > 35) {
      return false;
    }
    
    let re = /^[A-Z0-9]+$/i;
    if (!re.test(s)) {
      return false;
    }
    
    return true;
  }

  validate(s) {

    if (!this.normalize(s) || !this.check(s)) {
      this.errorMessage = `Invalid parameters: Invalid Testnet output address ${s}`;
      return false;
    }

    return true;
  }

  get errorMessage() {
    return this.errorMessage;
  }
}