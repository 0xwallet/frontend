import React from 'react';
import {Modal,ModalHeader,ModalBody,ModalFooter,Button,FormGroup,Label,Input,Col} from 'reactstrap';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATEORG_MUTATION = gql`
  mutation createOrg($name: String!) {
    createOrganization(name: $name) {
      name,
      users{
        email,
        username
      }
    }
  }
`;

const getMeOrg = gql`
    query GetOrganizations {
        me {
            organizations{
                name,
            }
        }
    }
`;

export default class OrgModal extends React.Component{
    state={
        isOpen: false,
        name: '',
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleChangeOrgName = (e) => {
      this.setState({
        name: e.target.value
      })
    }

    handleCompleted = (data) => {
      console.log(data);
      this.toggle();
    };

    handleUpdate = (cache, { data }) => {
      const { me: { organizations } } = cache.readQuery({ query: getMeOrg });
      Reflect.deleteProperty(data.createOrganization, 'users',);
      cache.writeQuery({
        query: getMeOrg,
        data: { me: { organizations: organizations.concat([data.createOrganization]) }}
      });
    };

    handleCreateOrg = (createOrg) => {
      createOrg();
      this.setState({
        isOpen: false,
      });
    }

    render(){
      const { name, isOpen } = this.state;
            return(
                <Modal isOpen={isOpen} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>
                      <strong>Organization</strong>
                      {/* <small>create</small> */}
                  </ModalHeader>
                  <ModalBody>
                  <FormGroup>
                    <Label htmlFor="company">Organization</Label>
                    <Input 
                      type="text" 
                      id="company" 
                      placeholder="Enter your organization name" 
                      value={name} 
                      onChange={this.handleChangeOrgName}
                    />
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
                  <Mutation
                    mutation={CREATEORG_MUTATION}
                    variables={{
                      name,
                    }}
                    onCompleted={this.handleCompleted}
                    update={this.handleUpdate}
                  >
                    {(createOrg, { loading, error}) => {
                      if (loading) return 'loading';
                      if (error) return 'error';
                      return (
                        <Button color="primary" onClick={() => createOrg()}>Ok</Button>
                      );
                    }}
                  </Mutation>
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            )
        
    }
}