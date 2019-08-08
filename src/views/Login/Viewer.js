// import React from 'react';
// import {Button,Input,Form,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap'

// import './Viewer.scss'

// import imgUrl from '../../assets/img/brand/logo.jpg';

// export default (props)=>{
//     return(
//         <div className={props.toLogin? "viewer tologin" : "viewer"}>
//             <div className="logo">
//                 <img src={imgUrl} alt="logo"></img>
//                 <h2 style={{textAlign : 'center'}}>0xAuth</h2>
//             </div>

//             {
//                 props.sendMessage && !props.toLogin? <div style={{color : "#73818f"}}>Wrong Code!</div> : ""
//             }

//             {
//                 props.toLogin  ? <div style={{color : "#73818f"}}>Hello {props.alias}!</div> : ""
//             }
            
//             <Form row="true" onSubmit={props.register} id="login">
//                 <InputGroup style={{margin : '1.3rem 0'}}>
//                     <InputGroupAddon addonType="append">
//                         <InputGroupText>
//                             <i className="fa fa-envelope-o"></i>
//                         </InputGroupText>
//                     </InputGroupAddon>
//                     <Input type="email" id="email" name="email" placeholder="Email" required/>            
//                 </InputGroup>
//                 {
//                     props.toLogin ?   <InputGroup>
//                     <InputGroupAddon addonType="append">
//                       <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
//                     </InputGroupAddon>
//                     <Input type="text" id="sig" name="verification" placeholder="Verification Code" autoComplete="current-password"/>
//                   </InputGroup>: ""
//                 }
//                 <div style={{marginTop : '1.3rem'}}>
//                     <Button color="primary" style={{width : "100%"}} type="submit">{
//                         !props.toLogin ? 'Enter' : 'Sign Up'
//                     }</Button>
//                 </div> 
//                 <div style={{marginTop : "1.3rem",width : "100%"}}>
//                      {
//                          xx(props.toLogin,props.sendAgain,props.count,props.sendMessage)
//                      }
//                     <span  style={{float : 'right'}}  className="webauthn" onClick={props.webauthn}>WebAuthn</span>
//                 </div>
             
//             </Form>

//         </div>
//     )
// }

// function xx(msg,fn,count,sendMessage){
//     if(msg){
//         if(count === 0){
//             return <span  style={{float : 'left',color : "#20a8d8"}} onClick={fn} className="resend">Resend</span>
//         }else{
//             return <p style={{float : 'left'}}>{`${count}s`}</p>
//         }
//     }else{
//         if(sendMessage){
//             if(count !== 0 ){
//                  return <p style={{float : 'left'}}>{`${count}s`}</p>
//             }else{
//                  return <span  style={{float : 'left',color : "#20a8d8"}} className="resend" onClick={fn}>Resend</span>                 
//             }
//         }
//         return ""
//     }
// }

import React from 'react';
import {Button,Input,Form,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap'

import './Viewer.scss'

import imgUrl from '../../assets/img/brand/logo.jpg';

export default (props)=>{
    const { sendcode ,user,errcode,count,sendAgain,isregister} = props;
    return(
        <div className={sendcode? "viewer tologin" : "viewer"}>
            <div className="logo">
                <img src={imgUrl} alt="logo"></img>
                <h2 style={{textAlign : 'center'}}>0xAuth</h2>
            </div> 
            {
                errcode && !sendcode? <div style={{color : "#73818f"}}>Wrong Code!</div> : ""
            }
            {
                sendcode? <div style={{color : "#73818f"}}>Hello {user}!</div> : (null)
            }     
            <Form row="true" onSubmit={props.register} id="login">
                <InputGroup style={{margin : '1.3rem 0'}}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            {
                                isregister.register? <i className="icon-user icons"></i> :
                                <i className="fa fa-envelope-o"></i> 
                            }
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="email" id="email" name="email" placeholder="Email" required/>            
                </InputGroup>
                {
                    sendcode?
                    <InputGroup>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="sig" name="verification" placeholder="Verification Code" autoComplete="current-password"/>
                  </InputGroup>: (null)
                }
                <div style={{marginTop : '1.3rem'}}>
                    <Button color="primary" style={{width : "100%"}} type="submit">{
                        sendcode ? (isregister.register?'Enter':'Sing Up') : 'Enter'
                    }</Button>
                </div> 
                <div style={{marginTop : "1.3rem",width : "100%"}}>
                    {
                        sendcode? countTimer(count,sendAgain): (null)
                    }
                    <span  style={{float : 'right'}}  className="webauthn" onClick={props.webauthn}>WebAuthn</span>
                </div>
             
            </Form>

        </div>
    )
}

function countTimer(count,fn){
    if(count === 0){
        return <span  style={{float : 'left',color : "#20a8d8"}} className="resend" onClick={fn}>Resend</span>
    }else{
        return <p style={{float : 'left'}}>{`${count}s`}</p>
    }
}