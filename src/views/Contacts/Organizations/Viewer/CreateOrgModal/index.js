import React from 'react';
import {Modal,ModalHeader,ModalBody,ModalFooter,Button,FormGroup,Label,Input,Col} from 'reactstrap'

export default class OrgModal extends React.Component{
    state={
        isOpen: false
    }
    toggle=()=>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render(){
        
            return(
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        <strong>Organization</strong>
                        {/* <small>create</small> */}
                    </ModalHeader>
                          <ModalBody>
                          <FormGroup>
                  <Label htmlFor="company">Organization</Label>
                  <Input type="text" id="company" placeholder="Enter your organization name" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="vat">VAT</Label>
                  <Input type="text" id="vat" placeholder="DE1234567890" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Street</Label>
                  <Input type="text" id="street" placeholder="Enter street name" />
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">City</Label>
                      <Input type="text" id="city" placeholder="Enter your city" />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input type="text" id="postal-code" placeholder="Postal Code" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Country</Label>
                  <Input type="text" id="country" placeholder="Country name" />
                </FormGroup>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Ok</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
            </Modal>
            )
        
    }
}