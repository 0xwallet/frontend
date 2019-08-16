import axios from 'axios';

const settingActions = {
    verify_auth_code: (token,email)=>{
        return ()=>new Promise((resolve,reject)=>{
            axios.get('https://owaf.io/v2api/verify_auth_code',{
                params: {
                    token,
                    email
                }
            })
        }).then(res=>{
            console.log(res)
        })
    },
    update_state:(token,state)=>{
        return(dispatch)=>new Promise((resolve,reject)=>{
            axios.get('https://owaf.io/v2api/update_state',{
                params: {
                    token,
                    state
                }
            }).then(res=>{
                console.log(res)
            })
        })
    },
}

export default settingActions;