import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { Query } from 'react-apollo';
import KanBan from '../KanBan';
import { getMeOrg } from '../Viewer/Grqphql';
import CalendarDetail from './CalenDarDetail';
// import './index.scss';

class Calendar extends Component {
  state = {
    active: true,
    name: "organization",
    currentOrgId: "",
  }

  handleSwitch = () => {
    this.setState({
      active: !this.state.active,
    });
  }

  handleChangeName = (_, name, orgId) => {
    this.setState({
      name,
      currentOrgId: orgId,
    });
  }

  render() {
    const { active, isOpen, name, currentOrgId } = this.state;
    return (
      <div className="animated">
        <Card>
          <CardHeader style={{ display: "flex", alignItems: "center", position: 'relative' }}>
            {
              !active 
              ? <span style={{ fontSize: '18px' }}><i class="icon-list" style={{ marginRight: '5px', fontSize: '18px' }}></i>KanBan</span>
              : <span style={{ fontSize: '18px' }}><i class="icon-calendar" style={{ marginRight: '5px', fontSize: '18px' }}></i>calendar</span>
            }
            <div style={{ margin: "0 10px"}}>
              <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked onClick={this.handleSwitch} />
              {/* <AppSwitch 
                variant={'pill'} 
                label 
                color={'success'} 
                size={'sm'} 
                onClick={this.handleSwitch}/> */}
            </div>
            <Query query={getMeOrg}>
              {
                ({ loading, error, data }) => {
                  if (loading) return 'loading';
                  if (error) return 'error';
                  return (
                    <Dropdown isOpen={isOpen} toggle={() => this.setState({ isOpen: !isOpen })} style={{ position: 'absolute', right: '20px' }}>
                    <DropdownToggle caret className="p-0" color="#000" style={{fontSize: '1.2rem'}}>
                      <i>{name}</i>
                    </DropdownToggle>
                    <DropdownMenu left="true" style={{maxHeight: "300px", overflow: 'auto'}}>
                      {
                          data.me && data.me.organizations.map(({name = "", id}, i)=>{
                              return(
                                <DropdownItem onClick={(e)=>{
                                    this.handleChangeName(e, name, id)
                                }} key={i}>
                                  {name}
                                </DropdownItem> 
                              )
                          })
                      }
                    </DropdownMenu>
                    </Dropdown>
                  );
                }
              }
            </Query>
          </CardHeader>
          <CardBody style={{height:'50em', overflow: "auto"}}>
            {
              active ? <CalendarDetail currentOrgId={currentOrgId} /> : <KanBan currentOrgId={currentOrgId} />
            }
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Calendar;
