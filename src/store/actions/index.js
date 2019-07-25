import axios from 'axios';

// https://owaf.io/v2api/webauthn_register?email=test@test.com&token=this_token_is_only_used_for_testing
const exampleAction = {
  register:(token,email)=>{
      return (dispatch, getState) =>{
          axios.get('https://owaf.io/v2api/webauthn_register',{
              params : {
                  email : 'test@test.com',
                  token : 'this_token_is_only_used_for_testing'
              }
          }).then((res)=>{
              console.log(res,'resres')
              dispatch(exampleAction.asyncSuccess(true))  
          }).catch((err)=>{
              dispatch(exampleAction.asyncError(false))              
          })
      }
  },
  asyncSuccess:(info)=>({
      type:'register',
      payload:{
        info
      }
  }),
}
export default exampleAction
