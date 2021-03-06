import React,{ PureComponent }from 'react';
import { Modal, ModalBody , ModalHeader ,Nav,NavItem,NavLink,} from 'reactstrap'
import Section from './Section';
import Search from './Search'
import './index.scss';

export default class Channels extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            modal : false,
            navItems: [],
            active : 0,
            dropdownOpen : [false,false],
            newtab : [],
            currnetname : '',
            chatmsg : [],
            inputval : '',
            minutes : 0,
            time:0,
            chatitem: {
                msgchildren: []
            }
        }
    }

    toggle = (v)=>{
        this.setState({
            modal: true
        })
        this.setState({
            modal:!this.state.modal,
            navItems: [...this.state.navItems,{id: v,name: v}]
        })
    }

    toggleclose = ()=>{
        this.setState({
            modal: !this.state.modal
        })
    }

    toggletab = (i,channel)=>{
        this.setState({
            active : i,
            currnetname : channel,
        });
    }

    toggleDrop = (i)=>{
        const newArray = this.state.dropdownOpen.map((element, index) => {
            return (index === i ? !element : false);
          });
          this.setState({
            dropdownOpen: newArray,
        });
    }

    opentab = ()=>{
        const newarr = [...this.state.navItems,{name:'newtab',id:Date.now()}];
        this.setState({
            navItems: newarr,
            active : newarr.length - 1 ,
            currnetname : 'newtab'
        })
    }

    closetab = (e,id)=>{
        const index = this.state.navItems.findIndex(v=>v.id === id);
        let closetab = [...this.state.navItems];
        closetab.splice(index,1);
        this.setState({
            navItems: closetab,
            active: 0
        },()=>{
            if(this.state.navItems.length === 0 ){
                this.toggleclose();
            }
        })
    }

    addmsg = (e)=>{
        const chatitem = {
            info : e.target.value,
            date : Date.now(),
            id : Date.now() * Math.random(0,100),
            user : 'lichangjie',
        }
    
        if(e.keyCode === 13){ 
            const sectionDom = document.querySelector('#section');
            sectionDom.scrollTop = sectionDom.scrollHeight ;
            
            this.setState({
                chatmsg : [...this.state.chatmsg,{...chatitem}],
                inputval : '',
            })
        }
    }

    handleChange = (value)=>{
        this.setState({
            inputval : value
         })
    }

    render(){
        const secprops = {
            onmsg : this.addmsg,
            onChange : this.handleChange,
            value: this.state.inputval,
            chatmsg : this.state.chatmsg
        }
        return(
            <>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className="channels">
                  <ModalHeader toggle={this.toggleclose} className="channelheader">Channels</ModalHeader>
                  <ModalBody className="channelswrap">
                        <Nav tabs className="nav">
                            {
                                this.state.navItems.length && this.state.navItems.map((v,i)=>{
                                    return(
                                        <NavItem key={i} className="navtab">
                                        <NavLink href="#" className="tablink" onClick={()=>{
                                            this.toggletab(i,v.name)
                                        }} style={{background:this.state.active === i ? "#fff":"",borderRadius:this.state.active === i ? '.7rem .7rem 0 0' : ''}}>
                                        <span className="tabtext">
                                        {v.name}
                                        </span>
                                        <span className="closeicon">
                                            <i className="fa fa-close" onClick={(e)=>{
                                             this.closetab(e,v.id)
                                            }}></i>
                                        </span>
                                        <span className="divider" style={{opacity:this.state.active === i || this.state.active === i + 1 ? 0 : ''}}></span> 
                                        </NavLink>
                                     </NavItem>
                                    )
                                })
                            }
                            <NavItem className="plus">
                                <i className="fa fa-plus" onClick={this.opentab}></i>
                            </NavItem>
                        </Nav>
                        <Section channel={this.state.currnetname} {...secprops}>
                            {
                                this.state.currnetname === 'newtab' ? (
                                <Search/>
                                ) : ""
                            } 
                        </Section> 
                  </ModalBody>
            </Modal>
         </>
        )
    }
}