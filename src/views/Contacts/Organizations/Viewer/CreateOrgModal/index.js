import React from 'react';
import {Modal,ModalHeader,ModalBody,ModalFooter,Button,FormGroup,Label,Input,Col} from 'reactstrap';
import { Mutation } from "react-apollo";
import { queryChannels, getMeOrg, CREATEORG_MUTATION, CreateChannel } from '../Grqphql';

export default class OrgModal extends React.Component{
    state={
        name: '',
    }

    handleChangeName = (e) => {
      this.setState({
        name: e.target.value
      })
    }

    handleUpdate = (cache, { data }) => {
      const { title } = this.props;
      if (title === 'organizations') {
        const { me: { organizations } } = cache.readQuery({ query: getMeOrg });
        cache.writeQuery({
          query: getMeOrg,
          data: { organizations: organizations.concat([data.createOrganization]) }
        });
      }else {
        const { me: { channels } } = cache.readQuery({ query: queryChannels });
        cache.writeQuery({
          query: queryChannels,
          data: { me: { channels: channels.concat([data.createChannel]) }}
        });
      }
    };

    render_orgs() {
      const { name } = this.state;
      return(
        <>
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
        </>
      );
    }

    
    render_channels() {
      const { name } = this.state;
      return(
        <>
          <FormGroup>
            <Label htmlFor="channelName">channel name</Label>
            <Input 
              type="text" 
              id="channelName" 
              placeholder="Enter your channelName " 
              value={name} 
              onChange={this.handleChangeName}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="vat">organization</Label>
            <Input type="text" id="orgId" placeholder="Enter your organization " />
          </FormGroup>
          {/* <FormGroup>
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
          </FormGroup> */}
        <FormGroup>
          <Label htmlFor="type">channel type</Label>
          <Input type="text" id="channelType" placeholder="Channel type" />
        </FormGroup>
        </>
      );
    }

    render(){
      const { isOpen, toggle, title, onCompleted } = this.props; 
      const { name } = this.state;
      const mutation = title === 'organizations' ? CREATEORG_MUTATION : CreateChannel;
      const variables = title === 'organizations' ? { name } : { name, organizationId: "3", type: 'PRIVATE' };
      return (
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            <strong>{title}</strong>
              {/* <small>create</small> */}
          </ModalHeader>
          <ModalBody>
          {this.render_channels()}
          </ModalBody>
          <ModalFooter>
          <Mutation
            mutation={mutation}
            variables={variables}
            onCompleted={onCompleted}
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
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
        </Modal>
      );
    }
}