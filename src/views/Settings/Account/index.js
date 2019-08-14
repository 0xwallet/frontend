import React,{PureComponent} from 'react';
import { Row, Col} from 'reactstrap';
import Userinfo from './Userinfo';
import Payinfo from './Payinfo';
import Appinfo from './Appinfo';


export default class Account extends PureComponent{
    state = {
        userInfoAuth: false,
        appInfoAuth: false,
        payInfoAuth: false
    }

    handleUserInfo = ()=>{
        this.setState({
            userInfoAuth: !this.state.userInfoAuth
        })
    }

    handleAppInfo = ()=>{
        this.setState({
            appInfoAuth: !this.state.appInfoAuth
        })
    }

    handlePayInfo = ()=>{
        this.setState({
            payInfoAuth: !this.state.payInfoAuth
        })
    }

    // verify

    handleVerigy = ()=>{
        console.log('just verify')
    }

    render(){
        return(
            <Row>
            <Col xs="24" sm="12" lg="6"> 
                <Userinfo onAuth={this.handleUserInfo} auth={this.state.userInfoAuth} onVerify={this.handleVerigy}/>
            </Col>
            <Col xs="24" sm="12" lg="6"> 
               <Row>
                   <Col>
                     <Payinfo onAuth={this.handlePayInfo} auth={this.state.payInfoAuth} onVerify={this.handleVerigy}/>
                   </Col>
               </Row>
               <Row>
                  <Col>
                     <Appinfo onAuth={this.handleAppInfo} auth={this.state.appInfoAuth} onVerify={this.handleVerigy}/>
                   </Col>
               </Row>
            </Col>
        </Row>
        )
    }
}