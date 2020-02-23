import React ,{PureComponent}from 'react';
import { 
    Row, Col, 
} from 'reactstrap';
// import { connect } from 'react-redux';
// import exampleAction from '../../../store/actions';
// import settingAction from '../../../store/actions/setting';
// import { bindActionCreators } from 'redux';

import Config from './Config';
import Keys from './keys';
import Backup from './Backup';

class Security extends PureComponent{
    state = {
        Authorizations: false,
        keys: false,
        backup: false,
        open: false,
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

    toggle = () => {
        this.setState((preState) => ({
            open: !preState.open,
        }))
    }

    getkeyslist = ()=>new Promise((resolve)=>{
        // this.props.actions.listkey(this.state.token).then(res=>resolve(res.keys))
    })
    
    componentDidMount(){
        // this.props.verifyAction.verify_auth_code(this.state.token,this.state.user);
        // this.props.verifyAction.update_state(this.state.token,"%7B%22ok%22:%201%7D");
    }

    render(){
        const keysprops = {
            toggle: this.toggle,
            auth: this.state.keys,
            open: this.state.open,
            onAuth: this.handleKeys,
        };
        
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

// const mapStateToProps = ()=>{
//     return {
//     }
//   }
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       actions : bindActionCreators(exampleAction,dispatch),
//       verifyAction: bindActionCreators(settingAction,dispatch)
//     }
//   }

// export default connect(mapStateToProps,mapDispatchToProps)(Security);;
export default Security;