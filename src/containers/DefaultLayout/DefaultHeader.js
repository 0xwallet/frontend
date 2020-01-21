import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import DefaultHeaderDropdown  from './DefaultHeaderDropdown';
import Modal from '../../components/Modal';
import logo from '../../assets/logo.png';
import sygnet from '../../assets/img/brand/logo.jpg';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  state = {
    isOpen: false,
  }

  toggle = ()=>{
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { isOpen } = this.state;

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
          {/* <i className="fa fa-compass" style={{fontSize:'1.5rem'}}
          onClick={this.toggle}></i> */}
          <i className="icon-speech"></i>
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
        <Modal toggle={this.toggle} isOpen={isOpen} ></Modal>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
