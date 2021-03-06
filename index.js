module.exports = {
  addressValidator: {
    errorMessage: '',
    normalize: function(s) {  
      let x = String(s) || '';
      return x.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
    },
    check: function(s) {
      
      if (s.length < 26 || s.length > 35) {
        return false;
      }
      
      let re = /^[A-Z0-9]+$/i;
      if (!re.test(s)) {
        return false;
      }
      
      return true;
    },
    validate: function(s) {

      if (!this.normalize(s) || !this.check(s)) {
        this.errorMessage = `Invalid parameters: Invalid Testnet output address ${s}`;
        return false;
      }

      return true;
    },
    errorMessage: function() {
      return this.errorMessage;
    }
  },
  DeviceList: function(configUrl) {
    return {
      removeListener: function (name, callback) { },
      on: function (name, callback) { name === 'transport' ? callback() : callback },
      hasDeviceOrUnacquiredDevice: function () {
        return true;
      },
      acquireFirstDevice: function (bool) {
        return new Promise((resolve, reject) => {
          resolve({ device: { features: { major_version: 1000, minor_version: 100, patch_version: 100  } }, 
            session: {
              on: function (name, callback) {  },
              getPublicKey: function (path, coin) {
                return new Promise((resolve, reject) => { 
                  switch(coin) {
                    case 'bitcoin':
                      resolve({ message: { xpub: 'xpub661MyMwAqRbcG9mRZW2tccfkuRxUoTuw4j2B5m1hYGEVfHDxaH5cdie93W2fr4TfMiP3Yss5pYywx3JWu166AEwE5vXD9HcXSHqWZvp7xkF' } });
                      break
                    case 'testnet':
                      resolve({ message: { xpub: 'tpubD6NzVbkrYhZ4YSh1zgHc1L2fNXQmSZM1FEbVFpNGzK9J1GDuhRnfoLUA7Unzq44qHVviVtyKdfLjnJYiuTUTjYAJt6Un4svFfRPb7m6TvZk' } });
                      break
                  }
                })
              },
              signTx: function (inputs, outputs, transactions, coin) {
                return new Promise((resolve, reject) => {
                  resolve({
                    message: {
                      serialized: {
                        serialized_tx: '58e1b8b52e85d25c2566db3a5f39d26fdfd2849b9860e74a1b012f3b8a9b32c7',
                        signatures: ['1', '2', '3']
                      }
                    }
                  });
                })
              },
              ethereumGetAddress: function (path) {
                return new Promise((resolve, reject) => {
                  resolve({
                    message: {
                      path: '44,37310,0,0,0',
                      address: '0xad2c75b6c883f7e62959fb8727e30720faa30739'
                    }
                  })
                })
              }
            }
          })
          return new Promise(function (resolve, reject) {  })
        }).catch(function () {  })
      }
    }
  },
  getPublicKey: function ({path, coin}) {
    return new Promise((resolve, reject) => { 
      switch(coin.toLowerCase()) {
        case 'bitcoin':
          resolve({ success: true, payload: { xpub: 'xpub6FnCEfWmb29ejBB96BNrhgJ4PJhSCazr4RPNG3iZ5a2d4YAJdo2bzgGrAdvuFAvrruFaWhkdstMB1eSp1gzRuBPWbZHaQbziVCRYnAMgbAD' } });
          break
        case 'testnet':
          resolve({ success: true, payload: { xpub: 'tpubD6NzVbkrYhZ4YSh1zgHc1L2fNXQmSZM1FEbVFpNGzK9J1GDuhRnfoLUA7Unzq44qHVviVtyKdfLjnJYiuTUTjYAJt6Un4svFfRPb7m6TvZk' } });
          break
        default:
          resolve({ success: true, payload: { xpub: 'xpub6FnCEfWmb29ejBB96BNrhgJ4PJhSCazr4RPNG3iZ5a2d4YAJdo2bzgGrAdvuFAvrruFaWhkdstMB1eSp1gzRuBPWbZHaQbziVCRYnAMgbAD' } });
          break
      }
    })
  },
  ethereumGetAddress: function ({path, coin}) {
    return new Promise((resolve, reject) => {
      resolve({
        success: true,
        payload: {
          path: '44,37310,0,0,0',
          address: '0xad2c75b6c883f7e62959fb8727e30720faa30739'
        }
      })
    })
  },
  signTransaction: function({ inputs, outputs, coin }) {
    let self = this;
    return new Promise((resolve, reject) => {
      outputs.forEach ((output) => {
        if (!self.addressValidator.validate(output['address'])) {
          return reject({
              success: false,
              payload: {
                error: self.addressValidator.errorMessage
              }
            })
        }
      });
      return resolve({
        success: true,
        payload: {
          serializedTx: '58e1b8b52e85d25c2566db3a5f39d26fdfd2849b9860e74a1b012f3b8a9b32c7',
          signatures: ['1', '2', '3']
        }
      });
    })
  },
  ethereumSignTransaction: function({path, transaction}) {
    return new Promise((resolve, reject) => {
      resolve({
        success: true,
        payload: {
          v: '0x23',
          r: '0xalksjhd',
          s: '0xoaukej'
        }
      });
    })
  },
  getAddress: function({path, coin}) {
    return new Promise((resolve, reject) => {
      resolve({
        success: true,
        payload: {
          address: 'mgYDL9xvE9bDAXQdWseNttP5V6iaRmBVZK',
          path: [44, 1, 0, 0, 0],
          serializedPath: '44,1,0,0,0'
        }
      });
    })
  }
}
