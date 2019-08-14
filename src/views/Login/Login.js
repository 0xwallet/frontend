import React, { Component } from 'react';
import { connect } from 'react-redux';
import exampleAction from '../../store/actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import "antd/dist/antd.css";

import Viewer from './Viewer';
import './Login.scss';

let timer1 = undefined;

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
      user: 'Guest'
    }
  }

  get email(){
    var form=document.querySelector('#login');
    const formdata = new FormData(form);
    const email = formdata.get('email')
    return email
  }

  get code(){
    var form=document.querySelector('#login');
    const formdata = new FormData(form);
    const code = formdata.get('verification')
    return code
  }

  webauthnlogin = ()=>{
    this.props.actions.webauthnlogin(this.email).then(res=>message.success(res))
    .catch(err=>message.error(err));
  }

  register(e){
    e.preventDefault();
    if(this.props.sendcode === true){
      this.props.actions.verifycode(this.email,this.code).then((res)=>message.success(res)).catch(res=>message.error(res))
    }
    if(this.props.sendcode === false){
      const that = this;
      this.props.actions.sendcode(this.email).then((res)=>{
        that.timerStart1();
        that.setState({
          user: that.email
        })
      }).catch()
    }
  }

  sendAgain(){
    this.props.actions.sendcode(this.email);
    this.setState({
      count:60
    },()=>{
      this.timerStart1()
    })
  }

  timerStop1= () => {
    clearInterval(timer1);
  }

  record1 = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1
    }));
  }

  timerStart1 = () =>  {
    timer1 = setInterval(() => this.record1(), 1000);
  }

  componentWillUnmount(){
    clearInterval(timer1);
  }

  render() {
    const props = {
      register : this.register,
      webauthn : this.webauthnlogin,
      sendcode: this.props.sendcode,
      user: this.state.user,
      isregister: this.props.isregister,
      errcode: this.props.errcode,
      count: this.state.count,
      sendAgain: this.sendAgain,
      timerStop1: this.timerStop1
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
    sendcode: state.codelogin.sendcode,
    isregister: state.codelogin.register,
    errcode: state.codelogin.errcode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(exampleAction,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);