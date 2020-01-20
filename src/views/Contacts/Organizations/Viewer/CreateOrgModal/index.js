import React from 'react';
import {
  Modal, ModalHeader, 
  ModalBody,ModalFooter,Button,FormGroup,Label,Input,Col, Dropdown, DropdownToggle, DropdownItem, DropdownMenu,
  FormText, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import { Mutation, Query, graphql } from "react-apollo";
import { queryChannels, getMeOrg, CREATEORG_MUTATION, CreateChannel } from '../Grqphql';

const MapCard = {
  organizations: {
    query: getMeOrg,
    mutation: {
      name: "createOrganization",
      case: CREATEORG_MUTATION
    }
  },
  channels: {
    query: queryChannels,
    mutation: {
      name: "createChannel",
      case: CreateChannel
    }
  },
  tasks: {
    query: getMeOrg,
    mutation: {
      name: "createOrganization",
      case: CREATEORG_MUTATION
    }
  },
  income: {
    query: queryChannels,
    mutation: {
      name: "createChannel",
      case: CreateChannel
    }
  },
}

class OrgModal extends React.Component{
    constructor(props) {
      super(props);
    }
    state={
        name: "",
        orgnameInChannels: "3",
        type: "",
        orgname: '',
        income: {
          actionName: 'income',
          isOpen: false,
        }
    }

    _createBoard = async() => {
      const { orgname } = this.state;
      await this.props.CREATEORG_MUTATION({
        variables: {
          name: orgname,
        }
      });
      this.props.toggle();
    };

    toggle = () => {
      this.setState((preState) => ({
        income: {...preState.income, isOpen: !preState.income.isOpen}
      }))
    }

    handleChangeAction = (e, name) => {
      const cloneState = {...this.state.income};
      cloneState.actionName = name;
      this.toggle();
      this.setState({
        income: cloneState
      });
    }

    handleChangeName = (e) => {
      this.setState({
        name: e.target.value
      })
    }

    handleChangeOrgName = (e) => {
      this.setState({
        orgname: e.target.value
      })
    }

    changeTheme(e) {
      const orgnameInChannels = e.target.value;
      this.setState({
        orgnameInChannels: orgnameInChannels,
      });
    }

    handleUpdate = (cache, { data }) => {
      const { title } = this.props;
      // 获取当前query 
      const query = MapCard[title].query;
      // 当前mutation的函数名
      const item = MapCard[title].mutation.name;

      // 当前的list名称 title
      const xx = cache.readQuery({ query });
      xx.me[title].push(data[item]);

      cache.writeQuery({
        query: query,
        data: xx,
      });

      this.props.onUpdate(xx.me[title]);
    };

    handleChangeType = (e) => {
      this.setState({
        type: e.target.value,
      })
    }

    render_orgs() {
      const { orgname } = this.state;
      return(
        <>
          <FormGroup>
            <Label htmlFor="company">Organization</Label>
            <Input 
              type="text" 
              id="company" 
              placeholder="Enter your organization name" 
              value={orgname} 
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
            <Input type="select" onChange={(e) => this.changeTheme(e)} value={this.state.orgnameInChannels} required >
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

    render_income() {
      const imgURl = './code.png'
      return (
        <div style={{ minHeight: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}>
          <h2>your address</h2>
          <img src={imgURl} alt="qr code" style={{ height: '150px', width: '150px'}}/>
          <h5>sssssssssssssssssssssssssssssssssssssss</h5>
          <FormGroup>
            <Label>Taxpayer Identification Numbers</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText><i className="fa fa-usd"></i></InputGroupText>
              </InputGroupAddon>
              <TextMask
                mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                Component={InputAdapter}
                className="form-control"
              />
            </InputGroup>
            <FormText color="muted">
              ex. 99-9999999
            </FormText>
          </FormGroup>
        </div>
      );
    }

    render_income_header() {
      const { income: { isOpen, actionName } } = this.state;
      const actions = ['deposit', 'Withdrawal ', 'Transfer'];
      return (
        <Dropdown isOpen={isOpen} toggle={() => {
          this.toggle();
        }}>
          <DropdownToggle caret>
            {actionName}
          </DropdownToggle>
          <DropdownMenu>
            {
              actions.map(v => <DropdownItem key={v} onClick={(e) => this.handleChangeAction(e, v)}>{v}</DropdownItem>)
            }
          </DropdownMenu>
        </Dropdown>
      );
    }

    render(){
      const { isOpen, toggle, onCompleted, title } = this.props; 
      const { name, orgnameInChannels, type, orgname } = this.state;
      // const mutation = title === 'organizations' ? CREATEORG_MUTATION : CreateChannel;
      // const variables = title === 'organizations' ? { name: orgname } : { name, organizationId: orgnameInChannels, type };
      // const refetchQueries = title === 'organizations' ? getMeOrg : queryChannels;
      // console.log(MapCard[title], title, this.title);
      const paramsMap = {
        channels: {
          name, organizationId: orgnameInChannels, type
        },
        organizations: {
          name: orgname
        },
      };
      return (
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {title === 'income' ? this.render_income_header() : <strong>{title}</strong>}
          </ModalHeader>
          <ModalBody>
            {title === 'organizations' && this.render_orgs()}
            {title === 'channels' && this.render_channels()}
            {title === 'income' && this.render_income()}
          </ModalBody>
          <ModalFooter style={{ display: title === 'income' ? 'none' : 'block' }}>
            <Mutation
              mutation={MapCard[title].mutation.case}
              variables={paramsMap[title]}
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
            {/* <Button color="success" onClick={() => this._createBoard()}>Ok</Button> */}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      );
    }
}

export default graphql(CREATEORG_MUTATION, { name: "CREATEORG_MUTATION" })(OrgModal);