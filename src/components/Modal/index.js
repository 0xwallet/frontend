import React,{ PureComponent } from 'react';
import { Modal, ModalBody, ModalHeader, Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// import Status from './components/Status/index';
import ChatClient from './components/ChatClient';
import ChatBrower from './components/ChatBrower';
import { Consumer } from '../../containers/DefaultLayout';
import './index.scss';

export default class Modals extends PureComponent{ 
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: new Array(4).fill(0),
        };
    }

    lorem(id,user,connectChannel) {
        if(user === 'New Tab'){
            return (
                   <ChatBrower connectChannel={connectChannel} id={id}/>
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
    
      tabPane(channels,connectChannel) {
        return (
          <>
            {
                channels.map((v,i)=>{
                    return(
                        <TabPane tabId={i} key={i} style={{padding:"0 1rem"}}>
                            {this.lorem(i,v.user,connectChannel)}
                        </TabPane>
                    )
                })
            }
          </>
        );
    }

    newTab = (channels,addChannels)=>{
        this.toggle(0,channels.length);
        addChannels();
    }

    closeTab = (id,closeChannels,channels)=>{
        const { toggle } = this.props;
        const i = channels.findIndex(v=>v.id === id);

        if( i === this.state.activeTab[0]){
            this.toggle(0,i - 1 )
        }
        if( i !== this.state.activeTab[0]){
            this.toggle(0,this.state.activeTab[0] - 1)
        }
        if(channels.length === 1){
            toggle();
            this.toggle(0,this.state.activeTab[0])
        }
        if(channels.length !==1 ){
            closeChannels(id);
        }
    }

    render(){
        const { isOpen, toggle} = this.props;
        return(
            <Consumer>
                {
                    ({ channels , addChannels, closeChannels, connectChannel})=>(
                        <Modal isOpen={isOpen} className="modalbody">
                            <ModalHeader toggle={toggle}>
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <Nav tabs className="nav">
                                            {
                                                channels.map((v,i)=>(
                                                    <NavItem key={i} className="navtab">
                                                        <NavLink
                                                        className="navlink"
                                                        active={this.state.activeTab[0] === i }
                                                        onClick={() => { this.toggle(0, i ); }}
                                                        >
                                                        {v.user}
                                                        </NavLink>
                                                        <i className="fa fa-close closeTab" onClick={()=>this.closeTab(v.id,closeChannels,channels)}></i>
                                                    </NavItem>
                                                ))
                                            }
                                            <i className="fa fa-plus" onClick={()=>this.newTab(channels,addChannels)} style={{marginLeft: '1rem'}}></i>
                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab[0]} style={{height:'80vh'}}>
                                            {this.tabPane(channels,connectChannel)}
                                        </TabContent>
                                </div>
                            </ModalBody>
                        </Modal>
                    )
                }
            </Consumer>
        )
    }
}