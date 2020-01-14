import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Card, CardBody, Progress ,Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import Modal from './CreateOrgModal';
import { Consumer } from '../../../../containers/DefaultLayout';
import { deleteOrgItem, deleteChannelItem, queryChannels, getMeOrg } from './Grqphql';

const checkMutation = {
  channels: deleteChannelItem,
  organizations: deleteOrgItem,
};

const checkQuery = {
  channels: queryChannels,
  organizations: getMeOrg,
};

const checkParams = {
  channels: 'channelId',
  organizations: 'organizationId',
}

const checkDelete = {
  channels: 'deleteChannel',
  organizations: 'deleteOrganization',
}

const propTypes = {
  header: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
};

const defaultProps = {
  header: '87.500',
  icon: 'icon-people',
  color: 'info',
  value: '25',
  children: 'Visitors',
  invert: false,
};

class OrgCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      title: "channels",
      control : {
        organizations: {
          open: false,
          name:"organizations",
          list: props.id === 'organizations' && props.list,
          icon: 'fa fa-gg-circle',
        },
        channels: {
          open: false,
          name: 'channels',
          list: props.id === 'channels' && props.list,
          icon: 'fa fa-hashtag',
        },
        tasks: {
          open: false,
          name: 'tasks',
          list: [],
          icon: 'fa fa-gg-circle',
        },
        income: {
          open: false,
          name: 'income',
          list: [],
          icon: 'fa fa-bitcoin',
        },
      }
    };
  }
  controlopen = (id)=>{
    const newobj = {...this.state.control};
    newobj[id].open = !newobj[id].open
    this.setState({
      control: newobj
    })
  }

  handleChangeName = (_, id, name, queryId) => {
    const { control } = this.state;
    const cloneControl = {...control};
    cloneControl[id].name = name;
    
    const { onChangeId } = this.props;
    onChangeId(queryId);
    this.setState({
      control: cloneControl
    })
  }

  handleCompleted = (data) => {
    this.handleToggle();
  };

  handleUpdate = (newList) => {
    const { title } = this.state;
    const cloneControl = {...this.state.control};
    cloneControl[title].list = newList;
    this.setState({
      control: cloneControl
    });
  }

  handleDeleteUpdate = (cache, { data }) => {
    const title = this.props.id;
    const cloneControl = {...this.state.control};
    const index = cloneControl[title].list.findIndex(v => v.id === data[checkDelete[title]].id);
    cloneControl[title].list.splice(index, 1);
    this.setState({
      control: cloneControl,
    });
  }

  handleToggle = (_ ,titleName = 'channels') => {
    this.setState(preState => ({
      isOpen: !preState.isOpen,
      title: titleName,
    }));
  }

  render() {
    const { className, cssModule, header, icon, color, value, children, invert  } = this.props;

    // demo purposes only
    const progress = { style: '', color: color, value: value };
    const card = { style: '', bgColor: '', icon: icon };

    if (invert) {
      progress.style = 'progress-white';
      progress.color = '';
      card.style = 'text-white';
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames('progress-xs mt-3 mb-0', progress.style);
    const { isOpen, title } = this.state;
    return (
        <Consumer>
            {
              (/* { connectHaveChannel,channels }*/)=>(
                <Card className={classes}>
                <CardBody>
                  <div className="" style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',fontSize: '2rem'}}>
                    <Dropdown id={this.props.id} isOpen={this.state.control[this.props.id].open} toggle={()=>this.controlopen(this.props.id)}>
                      <DropdownToggle caret className="p-0" color="#000" style={{fontSize: '1.2rem'}}>
                        <i className={this.state.control[this.props.id].icon}>{'   '}{this.state.control[this.props.id].name}</i>
                      </DropdownToggle>
                      <DropdownMenu left="true" style={{maxHeight: "300px", overflow: 'auto'}}>
                        {
                            this.state.control[this.props.id].list.map(({name = "", id}, i)=>{
                                return(
                                  <DropdownItem onClick={(e)=>{
                                      this.handleChangeName(e, this.props.id, name, id)
                                  }} key={i}>{name}
                                    <Mutation mutation={checkMutation[this.props.id]} variables={{
                                      [checkParams[this.props.id]]: id,
                                    }} refetchQueries={[{ query: checkQuery[this.props.id] }]}
                                      update={this.handleDeleteUpdate}
                                    >
                                      {
                                        (event, { loading, error }) => {
                                          if (loading) return 'loading';
                                          if (error) return 'error';
                                          return (
                                            <span 
                                              style={{ color: 'red', float: 'right', fontSize: '12px' }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                event();
                                              }}
                                            >
                                              删除
                                            </span>
                                          );
                                        }
                                      }
                                    </Mutation>
                                  </DropdownItem> 
                                )
                            })
                        }
                      </DropdownMenu>
                    </Dropdown>
                    <i className={card.icon} ></i>
                  </div>
                  <div className="h4 mb-0" style={{marginTop: '.5rem'}}>{header}</div>
                  <small className="text-muted text-uppercase font-weight-bold" style={{ display: 'flex', justifyContent: 'space-between'}}>
                    {children}
                    {this.props.id === 'channels' && <span style={{ color: 'blue', cursor:'pointer'}} onClick={(e) => this.handleToggle(e, 'channels')}>create channels</span>}
                    {this.props.id === 'organizations' && <span style={{ color: "blue", cursor:'pointer' }} onClick={(e) => this.handleToggle(e, 'organizations')}>create organizations</span>}
                  </small>
                  <Progress className={progress.style} color={progress.color} value={progress.value} />
                </CardBody>
                <Modal isOpen={isOpen} toggle={this.handleToggle} title={title} onCompleted={this.handleCompleted} onUpdate={this.handleUpdate}/>
                </Card>
              )
            }
          </Consumer>
  
    );
  }
}

OrgCard.propTypes = propTypes;
OrgCard.defaultProps = defaultProps;

export default OrgCard;