import React from 'react';
import {
  Modal,ModalHeader,ModalBody,ModalFooter,Button,FormGroup,Label,Input,Col
} from 'reactstrap';
import { Mutation, Query } from "react-apollo";
// import { useQuery } from '@apollo/react-hooks';
import { queryChannels, getMeOrg, CREATEORG_MUTATION, CreateChannel } from '../Grqphql';

export default class OrgModal extends React.Component{
    state={
        name: "",
        orgnameInChannels: "3",
        type: "",
    }

    handleChangeName = (e) => {
      this.setState({
        name: e.target.value
      })
    }

    changeTheme(e) {
      const orgnameInChannels = e.target.value;
      this.setState({
        orgnameInChannels: orgnameInChannels,
      });
    }

    handleUpdate = (cache, { data }) => {
      console.log(cache, data, 'update')
      // const { title } = this.props;
      // if (title === 'organizations') {
      //   const { me: { organizations } } = cache.readQuery({ query: getMeOrg });
      //   cache.writeQuery({
      //     query: getMeOrg,
      //     data: { organizations: organizations.concat([data.createOrganization]) }
      //   });
      // }else {
      //   const { me: { channels } } = cache.readQuery({ query: queryChannels });
      //   cache.writeQuery({
      //     query: queryChannels,
      //     data: { me: { channels: channels.concat([data.createChannel]) }}
      //   });
      // }
    };

    handleChangeType = (e) => {
      this.setState({
        type: e.target.value,
      })
    }

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
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="vat">organization</Label>
            <Input defaultValue="3" type="select" onChange={(e) => this.changeTheme(e)} value={this.state.orgnameInChannels} required >
              <Query query={getMeOrg}>
                {
                  ({ loading, error, data }) => {
                    if (loading) return <div>loading</div>;
                    if (error) return <div>error</div>
                    const { me: { organizations } } = data;
                    
                    return organizations.map((v) => {
                      return (
                        <option value={v.id} key={v.id}>{v.name}</option>
                      );
                    })
                  }
                }
              </Query>
            </Input>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label>channel type</Label>
            </Col>
            <Col md="9">
              <FormGroup check inline>
                <Input required className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="PRIVATE" onChange={this.handleChangeType} />
                <Label className="form-check-label" check htmlFor="inline-radio1">PRIVATE</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input required className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="PUBLIC" onChange={this.handleChangeType} />
                <Label className="form-check-label" check htmlFor="inline-radio2">PUBLIC</Label>
              </FormGroup>
            </Col>
          </FormGroup>
        </>
      );
    }

    render(){
      const { isOpen, toggle, title, onCompleted } = this.props; 
      const { name, orgnameInChannels, type } = this.state;
      const mutation = title === 'organizations' ? CREATEORG_MUTATION : CreateChannel;
      const variables = title === 'organizations' ? { name } : { name, organizationId: orgnameInChannels, type };
      return (
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            <strong>{title}</strong>
          </ModalHeader>
          <ModalBody>
            {title === 'organizations'? this.render_orgs() :this.render_channels()}
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