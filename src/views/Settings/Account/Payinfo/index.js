import React from 'react';
import {Card,CardBody,CardHeader,Row, Col,FormGroup,Label, Input} from 'reactstrap';
import Locking from '../Components/Locking';
export default (props)=>{
    const { onAuth ,auth, onVerify} = props;
    return(
        <Card>
              <CardHeader>
                <strong>Credit Card</strong>
                <small> Form</small>
                <Locking onAuth={onAuth} onVerify={onVerify} auth={auth}/>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" placeholder="Enter your name" required 
                      disabled={!auth}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Credit Card Number</Label>
                      <Input type="text" id="ccnumber" placeholder="0000 0000 0000 0000" required 
                      disabled={!auth}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Month</Label>
                      <Input type="select" name="ccmonth" id="ccmonth" disabled={!auth}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccyear">Year</Label>
                      <Input type="select" name="ccyear" id="ccyear" disabled={!auth}>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="cvv">CVV/CVC</Label>
                      <Input type="text" id="cvv" placeholder="123" required disabled={!auth}/>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>       
    )
}