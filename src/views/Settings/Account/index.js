import React,{PureComponent} from 'react';
import { Button }  from 'reactstrap';
import {connect} from 'react-redux';
import exampleAction from '../../../store/actions'
import {bindActionCreators} from 'redux';

class Account extends PureComponent{
    state={
        token : sessionStorage.getItem('token'),
        email : sessionStorage.getItem('user')
    }
    registerFido = ()=>{
        this.props.actions.register(this.state.token,this.state.email);
    }
    render(){
        return(
            <Button color="success" onClick={this.registerFido}>register</Button>
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