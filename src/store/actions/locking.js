import axios from 'axios';
function _base64ToArrayBuffer(base64) {
  var binary_string =  window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array( len );
  for (var i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}
function _arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

function _arrayBufferToString( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return binary;
}

const lockaction = {
    get_auth_code:(email)=>{
        return(dispatch)=>new Promise((resolve,reject)=>{
            axios.get('https://owaf.io/v2api/get_auth_code', {   
                params : {
                email
                }
            }).then((res)=>{
                resolve(res)
            }).catch((err)=>{
                reject(err)
            })
        })
    },

    verify_auth_code:(email,code)=>{
        return(dispatch)=>new Promise((resolve,reject)=>{
            axios.get('https://owaf.io/v2api/verify_auth_code', {   
                params : {
                    email,
                    code
                }
            }).then((res)=>{
                resolve(res)
            }).catch((err)=>{
                reject(err)
            })
        })
    },

    verify_webauthn:(email,type)=>{
        return (dispatch)=>new Promise((resolve,reject)=>{
            axios.get('https://owaf.io/v2api/webauthn_login',{
                params:{
                    email,
                    origin: window.location.origin
                }
            }).then(res=>{
                const data = JSON.parse(res.data.data)
                const allowCredentials = data.cred_ids.map(function(x){
                  return {
                      id: _base64ToArrayBuffer(x),
                      type: "public-key",
                    //   transports: ['usb','nfc','ble'] // internal
                    transports: [type]
                  }
                })
                const sref = res.data.sref;
                navigator.credentials.get({
                    publicKey: {
                      challenge: _base64ToArrayBuffer(data.challenge),
                      allowCredentials
                    }
                }).then((newCredential)=>{
                    axios.get('https://owaf.io/v2api/webauthn_login2',{
                        params:{
                        sref,
                        rawID: _arrayBufferToBase64(newCredential.rawId),
                        type: newCredential.type,
                        clientDataJSON: _arrayBufferToString(newCredential.response.clientDataJSON),
                        authenticatorData: _arrayBufferToBase64(newCredential.response.authenticatorData),
                        sig: _arrayBufferToBase64(newCredential.response.signature)
                        }
                    }).then((res)=>{
                        resolve('success')
                    }).catch((err)=>{
                        reject('error')
                    })
                })
            })
        })
    } 
}

export default lockaction;
