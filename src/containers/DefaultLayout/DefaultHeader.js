import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import DefaultHeaderDropdown  from './DefaultHeaderDropdown';
import Modal from '../../components/Modal';
import logo from '../../assets/logo.png'
import sygnet from '../../assets/img/brand/logo.jpg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  state = {
    isOpen: false,
    tabs: []
  }

  toggle = ()=>{
    this.setState({isOpen: !this.state.isOpen})
  }

  sendInput = ()=>{
    
  }

  // modal method
  addTabs = ()=> {
    this.setState({
      tabs: [...this.state.tabs,{ user: 'New Tab',id: Date.now() }]
    })
  }

  connectChannel = (channelName,id)=>{
     const cloneTabs = [...this.state.tabs]
     cloneTabs[id].user = channelName;
     this.setState({
       tabs: cloneTabs
     })
  }

  closeTab = (i)=>{
    const cloneTabs = [...this.state.tabs];
    cloneTabs.splice(i,1);
    this.setState({
      tabs: cloneTabs
    })
  }


  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { isOpen, tabs } = this.state;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: '0xWallet' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: '0xWallet' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <a href="https://www.owaf.org/docs/" className="nav-link" alt="documentation" >Documentation</a>
          </NavItem>
          <NavItem className="px-3">
            <a href="https://www.owaf.org/blog/" alt="blog">Blog</a>
          </NavItem>
          <NavItem className="px-3">
            <a href="https://help" alt="help">Help</a>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <i className="fa fa-compass" style={{fontSize:'1.5rem'}}
          onClick={this.toggle}></i>
          <DefaultHeaderDropdown notif/>
          {/* <DefaultHeaderDropdown tasks/>
          <DefaultHeaderDropdown mssgs/>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <DefaultHeaderDropdown onLogout={this.props.logout} upgrade={this.props.upgrade} accnt/>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}

        {/* channel modal */}
        <Modal toggle={this.toggle} isOpen={isOpen} tabs={tabs} sendInput={this.sendInput}
        addTabs={this.addTabs} connectChannel={this.connectChannel}
        closeTab={this.closeTab}></Modal>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
