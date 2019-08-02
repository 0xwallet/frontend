import axios from 'axios';
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
              function _base64ToArrayBuffer(base64) {
                var binary_string =  window.atob(base64);
                var len = binary_string.length;
                var bytes = new Uint8Array( len );
                for (var i = 0; i < len; i++)        {
                    bytes[i] = binary_string.charCodeAt(i);
                }
                return bytes.buffer;
            }
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
                  // console.log(_arrayBufferToString(cred.response.clientDataJSON))
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
    return(dispatch,getState)=>{
      // `https://owaf.io/v2api/verify_auth_code?token=${token}`
      fetch(`http://161.117.83.227/v2api/doc`,{
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
        console.log(res)
      })
    }
  }
}
export default exampleAction
