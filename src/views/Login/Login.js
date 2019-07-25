import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import Viewer from './Viewer';
import './Login.scss'

axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject(error);
});

class Login extends Component {
  constructor(){
    super();
    this.register = this.register.bind(this);
    this.sendAgain = this.sendAgain.bind(this);
    this.state = {
      count  : 60,
      alias : "Guest"
    }
  }

  register(e){
    e.preventDefault()
    const that = this;
    var form=document.querySelector('#login');
    const formdata = new FormData(form);

    if(this.props.info === false){
      that.props.changeInfo(true)
      if(this.state.count === 0 ){
        this.setState({
          count : 60
        },()=>{
          this.tick();
        })
      }else{
        this.tick();
      }
      axios.get('https://owaf.io/v2api/get_auth_code', {   
        params : {
          email : formdata.get('email'),  
        }
      })
      .then(function ({data:{r}}) {
        if(r.registered){
          that.setState({
            alias : formdata.get('email')
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(this.props.info === true){
      axios.get('https://owaf.io/v2api/verify_auth_code', {   
        params : {
          email : formdata.get('email'),  
          code : formdata.get('verification')
        }
      })
      .then(function ({data : {r}}) {
        if(r !== 'wrong code'){
          sessionStorage.setItem('user',formdata.get('email'));
          sessionStorage.setItem('token',r.token);

          that.props.changeToLogin(true);
          that.props.changeSendMsg(false);
          that.props.history.push('/dashboard')// yanzheng to home
        }else{
          that.props.changeSendMsg(true); // send again
          that.props.changeInfo(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  sendAgain(){
    var form=document.querySelector('#login');
    const formdata = new FormData(form);
    if(this.props.info){
      this.props.changeInfo(false);
    }else{
      this.props.changeInfo(true);
    }
    this.setState({
      count : 60,
    },()=>{
      this.tick()
    })
    axios.get('https://owaf.io/v2api/get_auth_code', {   
      params : {
        email : formdata.get('email'),  
      }
    })
    .then(function ({data : {r}}) {
      console.log(r)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  tick = ()=>{
    clearInterval(this.timer)
    this.timer = setInterval(()=>{
      this.setState({
        count : this.state.count - 1
      },()=>{
        if(this.state.count === 0){
          clearInterval(this.timer);
        }
      })
    },1000)
  }

  // webauthn = ()=>{
  //   var form=document.querySelector('#login');
  //   const formdata = new FormData(form);
  //   const user = formdata.get('email');
  //   if(user === ''){
  //     return false
  //   }
  //   const str = 'wvqwJWTreozPWe2ryhKSzNqhkrD1aoD8fcw3b';
  //   // uint8
  //   function stringToUint8Array(str){
  //     var arr = [];
  //     for (var i = 0, j = str.length; i < j; ++i) {
  //       arr.push(str.charCodeAt(i));
  //     }
     
  //     var tmpUint8Array = new Uint8Array(arr);
  //     return tmpUint8Array
  //   }

  //   const newstr = stringToUint8Array(str);
   
  //   var createCredentialDefaultArgs = {
  //     publicKey: {
  //         // Relying Party (a.k.a. - Service):
  //         rp: {
  //             name: "Acme"
  //         },
  
  //         // User:
  //         user: {
  //             id: new Uint8Array(16),
  //             name: formdata.get('email'),
  //             displayName: "John P. Smith"
  //         },
  
  //         pubKeyCredParams: [{
  //             type: "public-key",
  //             alg: -7
  //         }],
  
  //         attestation: "direct",
  
  //         timeout: 60000,
  
  //         challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
  //             0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
  //             0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
  //         ]).buffer
  //         // challenge: newstr
  //     }
  // };
  
  // // sample arguments for login
  // var getCredentialDefaultArgs = {
  //     publicKey: {
  //         timeout: 60000,
  //         // allowCredentials: [newCredential] // see below
  //         challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
  //             0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
  //             0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
  //         ]).buffer
  //         // challenge: newstr
  //     },
  // };
  // // data: "{"challenge":"wvqwJWTreozPWe2ryhKSzNqhkrD1aoD8fcw3b//hJpg=","rp_id":"localhost","user":"test@test.com"}"
  // // register / create a new credential
  // navigator.credentials.create(createCredentialDefaultArgs)
  //     .then((cred) => {
  //         console.log("NEW CREDENTIAL", cred);
  
  //         // normally the credential IDs available for an account would come from a server
  //         // but we can just copy them from above...
  //         var idList = [{
  //             id: cred.rawId,
  //             transports: ["usb", "nfc", "ble"],
  //             type: "public-key"
  //         }];
  //         getCredentialDefaultArgs.publicKey.allowCredentials = idList;
  //         return navigator.credentials.get(getCredentialDefaultArgs);
  //     })
  //     .then((assertion) => {
  //         console.log("ASSERTION", assertion);
  //     })
  //     .catch((err) => {
  //         console.log("ERROR", err);
  //     });
  // }

  webauthn = ()=>{

  }

  componentWillUnmount(){
      clearInterval(this.timer);
  }

  render() {
    const props = {
      register : this.register,
      toLogin : this.props.info,
      sendMessage : this.props.sendMessage,
      sendAgain : this.sendAgain,
      count : this.state.count,
      alias : this.state.alias,
      webauthn : this.webauthn
    }

    return (
      <div className="login">
        <Viewer {...props}/>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    info : state.login.info,
    sendMessage : state.login.sendAgain
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInfo : (info)=> dispatch({type : "login",payload : { info }}),
    changeSendMsg : (info)=> dispatch({type : "sendAgain",payload : { sendAgain : info }}),
    changeToLogin : (info)=> dispatch({type : "tologin",payload : { tologin : info }}),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);