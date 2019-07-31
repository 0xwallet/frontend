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