// import React,{PureComponent} from 'react';
// import { Modal ,ModalHeader,ModalBody,Input,Progress, FormGroup} from 'reactstrap';
// import {connect} from 'react-redux';
// import { AppSwitch } from '@coreui/react';
// import lockaction from '../../../../../../../store/actions/locking';
// import { bindActionCreators } from 'redux';

// import './index.scss';

// class Locking extends PureComponent{
//     state = {
//         isOpen: false,
//         isSendSucc: false,
//         email: localStorage.getItem('email'),
//         progress:0,
//         verifysucc: false,
//         verifywebauth:{
//             'usb': false,
//             'internal': false
//         },
//         iserror: false,
//     }

//     handleIsOpen = (e)=>{
//         this.setState({
//             isOpen: !this.state.isOpen,
//         })
//     }

//     handleVerifyCode = (e)=>{
//        let code = e.target.value;
//        if(code.length === 6){
//             this.props.actions.verify_auth_code(this.state.email,code).then(res=>{
                
//                 if(res.data.r !== 'wrong code'){
//                     this.setState((preState)=>({
//                         verifysucc: true,
//                         progress: preState.progress + (1/3) * 100
//                     }),()=>{
//                         if(this.state.verifysucc === true){
//                             setTimeout(()=>{
//                                 this.setState({
//                                     isSendSucc: false
//                                 },()=>{
//                                     if(this.state.progress > 90){
//                                         this.handleIsOpen();
//                                         // this.props.onAuth();
//                                     }
//                                 })
//                             },2000)
//                         } 
//                     })
//                 }
//                 if(res.data.r === 'wrong code'){
//                     this.setState({
//                         isSendSucc: true,
//                         verifysucc: false,
//                         iserror: true
//                     })
//                 }
//             }).catch(err=>{

//             })
//        }
       
//     }

//     closelocking = ()=>{
//         this.props.onAuth()
//     }

//     sendcode = ()=>{
//         this.props.actions.get_auth_code(this.state.email).then((res)=>{
//             this.setState({
//                 isSendSucc: true,
//             })
//         }).catch((err)=>{
//             this.setState({
//                 isSendSucc: false
//             })
//         })
//     }

//     verify_webauthn = (type)=>{
//         this.props.actions.verify_webauthn(this.state.email,type).then(res=>{
//             this.setState((preState)=>({
//                 verifywebauth: {...preState.verifywebauth,[type]: true},
//                 progress: preState.progress + (1/3) * 100
//             }),()=>{
//                 if(this.state.progress > 90){
//                     this.handleIsOpen(); // close modal
//                     // this.props.onAuth();
//                 }
//             })
//         }).catch(err=>{
//             console.log(err);
//         })
//     }

//     canEdit = ()=>{
//         this.props.onAuth();
//         if(this.props.auth === true){
//             this.handleIsOpen();
//         }
//     }

//     render(){
//         const {isOpen,isSendSucc,verifysucc,iserror,progress,verifywebauth} = this.state;
//         return(
//             <div>
import React,{PureComponent} from 'react';
import { AppSwitch } from '@coreui/react';

export default class Locking extends PureComponent{
   canEdit = ()=>{
        this.props.onAuth();
        if(this.props.auth === true){
             this.props.onVerify();
        }
   }
   
   render(){
       return(
            <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} size={'sm'}  onClick={this.canEdit} />
       )
   }
}


