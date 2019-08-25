import React,{ PureComponent } from 'react';
import { Modal, ModalBody, ModalHeader, Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// import Status from './components/Status/index';
import ChatClient from './components/ChatClient';
import ChatBrower from './components/ChatBrower';
import './index.scss';

export default class Modals extends PureComponent{
    
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: new Array(4).fill(0),
        };
    }

    lorem(id,user) {
        if(user === 'New Tab'){
            return (
                   <ChatBrower connectChannel={this.props.connectChannel} id={id}/>
            )
        }else{
            return <ChatClient id={id}/>
        }     
    }

    toggle(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
          activeTab: newArray,
        });
      }
    
      tabPane() {
        return (
          <>
            {
                this.props.tabs.map((v,i)=>{
                    return(
                        <TabPane tabId={i} key={i}>
                            {this.lorem(i,v.user)}
                        </TabPane>
                    )
                })
            }
          </>
        );
    }

    newTab = ()=>{
        const { tabs, addTabs } = this.props;
        this.toggle(0,tabs.length);
        addTabs()
    }

    closeTab = (i)=>{
        const { closeTab, tabs, toggle } = this.props;
        closeTab(i);
        if( i === this.state.activeTab[0]){
            this.toggle(0,i - 1 )
        }else{
            this.toggle(0,this.state.activeTab[0] - 1)
        }
        if(tabs.length === 1){
            toggle();
            this.toggle(0,this.state.activeTab[0])
        }
    }

    render(){
        const { isOpen, toggle, tabs} = this.props;
        return(
            <Modal isOpen={isOpen} className="modalbody">
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                <div>
                    <Nav tabs className="nav">
                            {
                                tabs.map((v,i)=>(
                                    <NavItem key={i} className="navtab">
                                        <NavLink
                                        className="navlink"
                                        active={this.state.activeTab[0] === i }
                                        onClick={() => { this.toggle(0, i ); }}
                                        >
                                        {v.user}
                                        </NavLink>
                                        <i className="fa fa-close closeTab" onClick={()=>this.closeTab(i)}></i>
                                    </NavItem>
                                ))
                            }
                            <i className="fa fa-plus" onClick={this.newTab} style={{marginLeft: '1rem'}}></i>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab[0]}>
                            {this.tabPane()}
                        </TabContent>
                </div>
            </ModalBody>
        </Modal>
        )
    }
}