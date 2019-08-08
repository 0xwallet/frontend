import React ,{PureComponent}from 'react';
import {Row,Col} from 'reactstrap';
import Config from './Config';
import Keys from './keys';
import Backup from './Backup';
export default class Security extends PureComponent{
    state = {
        Authorizations: false,
        keys: false,
        backup: false,
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

    render(){
        return(
            <Row>
                <Col xs="24" sm="12" lg="6"> 
                    <Config auth={this.state.Authorizations} onAuth={this.handleAuthor}/>
                </Col>
                <Col xs="24" sm="12" lg="6"> 
                   <Row>
                       <Col>
                         <Keys auth={this.state.keys} onAuth={this.handleKeys}/>
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