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
const exampleAction = {
  register:(token,email)=>{
      return (dispatch, getState) =>{
          axios.get('http://161.117.83.227/v2api/webauthn_register',{
              params : {
                token,
                origin: window.location.origin
              }
          }).then(({data})=>{
              // console.log(data)
              const challenge = _base64ToArrayBuffer(data.challenge);
      
              var createCredentialDefaultArgs = {
                publicKey: {
                    // Relying Party (a.k.a. - Service):
                    rp: {
                      id: data.rp_id,
                      name: 'Wax FTW'
                    },

                    origin: data.origin,
            
                    // User:
                    user: {
                      id: new Uint8Array(16),
                      name: data.user,
                      displayName: data.user
                    },
            
                    pubKeyCredParams: [{
                        type: "public-key",
                        alg: -7
                    }],
            
                    // attestation: "direct",
                    attestation:"none",
                    // timeout: 60000,

                    challenge
                }
            };
              navigator.credentials.create(createCredentialDefaultArgs)
              .then((cred) => {                                 
                  axios.get('http://161.117.83.227/v2api/webauthn_register2',{
                    params : {
                      type: cred.type,
                      rawID: _arrayBufferToBase64(cred.rawId),
                      clientDataJSON: _arrayBufferToString(cred.response.clientDataJSON),
                      sref:data.sref,
                      token,
                      attestationObject:_arrayBufferToBase64(cred.response.attestationObject)
                    }
                  }).then((res)=>{
                    console.log(res)
                  })
              })
              .then((assertion) => {
                  console.log("ASSERTION", assertion);
              })
              .catch((err) => {
                  console.log("ERROR", err);
              });
              // dispatch(exampleAction.asyncSuccess(true))  
          }).catch((err)=>{
              console.log(err,'error')
              // dispatch(exampleAction.asyncError(false))              
          })
      }
  },
  
  asyncSuccess:(info)=>({
      type:'register',
      payload:{
        info
      }
  }),

  login: (token,email)=>{
    return(dispatch,getState)=>{ fetch(`http://161.117.83.227/v2api/doc`,{
        method:'get',
        // mode: "no-cors"
      }).then((res)=>res.json()).then(data=>console.log(data))
    }
  },
  listkey : (token)=>{
    return(dispatch,getState)=>{
      axios.get('http://161.117.83.227/v2api/list_webauthn_keys',{
        params: {
          token
        }
      })
    }
  },
  vefifytoken : (token)=>{
    return(dispatch,getState)=>{
      axios.get('http://161.117.83.227/v2api/verify_token',{
        params: {
          token
        }
      }).then((res)=>{
        const r = res.data.r;
      if(r === 'token invalid'){
        dispatch({
          type: 'webauthnlogin',
          payload: {
            info: false
          }
        })
      }
      if(r === 'valid'){
        dispatch({
          type: 'webauthnlogin',
          payload: {
            info: true
          }
        })
       }
      })
    }
  },
  webauthnlogin: (email)=>{
    return(dispatch,getState)=>{
      axios.get('http://161.117.83.227/v2api/webauthn_login',{
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
              transports: ['usb','nfc','ble']
          }
        })
      const sref = res.data.sref;
      navigator.credentials.get({
        publicKey: {
          challenge: _base64ToArrayBuffer(data.challenge),
          allowCredentials
        }
      }).then((newCredential)=>{     
        axios.get('http://161.117.83.227/v2api/webauthn_login2',{
          params:{
            sref,
            rawID: _arrayBufferToBase64(newCredential.rawId),
            type: newCredential.type,
            clientDataJSON: _arrayBufferToString(newCredential.response.clientDataJSON),
            authenticatorData: _arrayBufferToBase64(newCredential.response.authenticatorData),
            sig: _arrayBufferToBase64(newCredential.response.signature)
          }
        }).then((res)=>{
          localStorage.setItem('token',res.data.token) // save
          dispatch({
            type: 'webauthnlogin',
            payload: {
              info: true // login success
            }
          })
        }).catch(err=>{
          dispatch({
            type: 'webauthnlogin',
            payload: {
              info: false // login error
            }
          })
        })

      }).catch((err)=>{
        console.log(err);
      })
      }).catch((err)=>{
        dispatch({
          type: 'webauthnlogin',
          payload: {
            info: false
          }
        })
        alert('invalid email')
      })
    }
  },
  logout : ()=>{
    return(dispatch)=>{
      localStorage.clear();
      dispatch({
        type: 'webauthnlogin',
        payload: {
          info: false
        }
      })
      dispatch({
        type: 'sendcode',
        payload: {
          info: false
        }
      })
    }
  },
  sendcode : (email)=>{
    return (dispatch)=>new Promise((resolve,reject)=>{
      axios.get(' http://161.117.83.227/v2api/get_auth_code', {   
        params : {
          email
        }
      }).then((res)=>{
        resolve('success')
        dispatch({
          type:'sendcode',
          payload: {
            info: true,
            register: res.data.r.registered
          }
        })
      }).catch((err)=>{
        reject('defeat')
        dispatch({
          type:'sendcode',
          payload: {
            info: false,
          }
        })
      })
    })
  },
  verifycode:(email,code)=>{
    return(dispatch)=>new Promise((resolve,reject)=>{
      axios.get('http://161.117.83.227/v2api/verify_auth_code', {   
        params : {
          email, 
          code
        }
      }).then(({data : {r}})=>{
        if( r !== 'wrong code'){
          resolve('login success')
          localStorage.setItem('token',r.token);
        }else{
          reject('verifycode error')
          dispatch({
            type:'sendcode',
            payload: {
              info: false,
            }
          })
          dispatch({
            type:'errcode',
            payload: {
              info: true,
            }
          })
        }
      }).catch(()=>{
        alert('server error')
      })
    })
  }
}
export default exampleAction
