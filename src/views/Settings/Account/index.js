import React,{PureComponent} from 'react';
import { Button }  from 'reactstrap';
import {connect} from 'react-redux';
import exampleAction from '../../../store/actions'
import { bindActionCreators } from 'redux';

class Account extends PureComponent{
    state={
        token : localStorage.getItem('token'),
        email : localStorage.getItem('user')
    }
    registerFido = ()=>{
        this.props.actions.register(this.state.token,this.state.email);
    }

    loginFido = ()=>{
        this.props.actions.login(this.state.token,this.state.email);
    }

    vefifytoken = ()=>{
        this.props.actions.vefifytoken(this.state.token)
    }

    keylist = ()=>{
        this.props.actions.listkey(this.state.token)
    }

    webauthnlogin = ()=>{
        this.props.actions.webauthnlogin(this.state.email)
    }

    render(){
        return(
            <div>
                <Button color="success" onClick={this.registerFido}>注册一</Button>
                <Button color="info" onClick={this.loginFido}>注册2</Button>
                <Button color="success" onClick={this.vefifytoken}>验证token</Button>
                <Button color="info" onClick={this.keylist}>获取所有key</Button>
                <Button color="info" onClick={this.webauthnlogin}>webauthnlogin</Button>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        register: state.account
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      actions : bindActionCreators(exampleAction,dispatch)
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Account);