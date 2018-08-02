module.exports = {
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
                        serialized_tx: '000serializedTx',
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
                      address: 'b5ae11144f988735aecf469b96b72f979736dbcc'
                    }
                  })
                })
              }
            }
          })
          return new Promise(function (resolve, reject) {  })
        }).catch(function () {  })
      },
      getPublicKey: function ({path, coin}) {
        return new Promise((resolve, reject) => { 
          switch(coin) {
            case 'bitcoin':
              resolve({ success: true, payload: { xpub: 'xpub661mymwaqrbcg9mrzw2tccfkurxuotuw4j2b5m1hygevfhdxah5cdie93w2fr4tfmip3yss5pyywx3jwu166aewe5vxd9hcxshqwzvp7xkf' } });
              break
            case 'testnet':
              resolve({ success: true, payload: { xpub: 'tpubD6NzVbkrYhZ4YSh1zgHc1L2fNXQmSZM1FEbVFpNGzK9J1GDuhRnfoLUA7Unzq44qHVviVtyKdfLjnJYiuTUTjYAJt6Un4svFfRPb7m6TvZk' } });
              break
            default:
              resolve({ success: true, payload: { xpub: 'xpub661mymwaqrbcg9mrzw2tccfkurxuotuw4j2b5m1hygevfhdxah5cdie93w2fr4tfmip3yss5pyywx3jwu166aewe5vxd9hcxshqwzvp7xkf' } });
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
              address: 'b5ae11144f988735aecf469b96b72f979736dbcc'
            }
          })
        })
      },
      signTransaction: function({ inputs, outputs, coin }) {
        return new Promise((resolve, reject) => {
          resolve({
            success: true,
            payload: {
              serializedTx: '000serializedTx',
              signatures: ['1', '2', '3']
            }
          });
        })
      }
    }
  }
}
