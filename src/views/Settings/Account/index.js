import React,{PureComponent} from 'react';
import { Row, Col} from 'reactstrap';
import Userinfo from './Userinfo';
import Payinfo from './Payinfo';
import Appinfo from './Appinfo';


export default class Account extends PureComponent{
    render(){
        return(
            <Row>
            <Col xs="24" sm="12" lg="6"> 
                <Userinfo/>
            </Col>
            <Col xs="24" sm="12" lg="6"> 
               <Row>
                   <Col>
                     <Payinfo />
                   </Col>
               </Row>
               <Row>
                  <Col>
                     <Appinfo/>
                   </Col>
               </Row>
            </Col>
        </Row>
        )
    }
}