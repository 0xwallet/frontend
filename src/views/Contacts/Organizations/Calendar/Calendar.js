import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { Query } from 'react-apollo';
import KanBan from '../KanBan';
// import { useQuery, Query } from 'react-apollo';
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
            <span>看板</span>
            <div style={{ margin: "0 10px"}}>
              <AppSwitch 
                variant={'pill'} 
                label 
                color={'success'} 
                size={'sm'} 
                onClick={this.handleSwitch}/>
            </div>
            <span>日历</span>
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
                          data.me.organizations.map(({name = "", id}, i)=>{
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
