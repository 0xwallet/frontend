import React ,{PureComponent}from 'react';
import {Row,Col} from 'reactstrap';
import {connect} from 'react-redux';
import exampleAction from '../../../store/actions'
import { bindActionCreators } from 'redux';

import Config from './Config';
import Keys from './keys';
import Backup from './Backup';

class Security extends PureComponent{
    state = {
        Authorizations: false,
        keys: false,
        backup: false,
        token: localStorage.getItem('token')
    }

    handleKeys = ()=>{
        this.setState({
            keys:!this.state.keys
        })
    }

    handleAuthor = ()=>{
        this.setState({
            Authorizations:!this.state.Authorizations
        })
    }

    handleBackup = ()=>{
        this.setState({
            backup:!this.state.backup
        })
    }

    addkeys = ()=>{
        this.props.actions.register(this.state.token);
    }

    getkeyslist = ()=>new Promise((resolve)=>{
        this.props.actions.listkey(this.state.token).then(res=>resolve(res.keys))
    })
    

    render(){
        const keysprops = {
            getkeyslist: this.getkeyslist,
            auth: this.state.keys,
            onAuth: this.handleKeys,
            addkeys: this.addkeys
        }
        return(
            <Row>
                <Col xs="24" sm="12" lg="6"> 
                    <Config auth={this.state.Authorizations} onAuth={this.handleAuthor}/>
                </Col>
                <Col xs="24" sm="12" lg="6"> 
                   <Row>
                       <Col>
                         <Keys {...keysprops}/>
                       </Col>
                   </Row>
                   <Row>
                      <Col>
                         <Backup auth={this.state.backup} onAuth={this.handleBackup}/>
                       </Col>
                   </Row>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = ()=>{
    return {
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      actions : bindActionCreators(exampleAction,dispatch)
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Security);