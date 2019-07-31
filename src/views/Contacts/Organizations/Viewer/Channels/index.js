import React,{ PureComponent }from 'react';
import { Modal, ModalBody , ModalHeader ,Nav,NavItem,NavLink,Dropdown,DropdownToggle,DropdownMenu,DropdownItem,Input,InputGroup,InputGroupAddon,Button} from 'reactstrap'
import Section from './Section';
import Search from './Search'
import './index.scss';


export default class Channels extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            modal : false,
            navItems : [{id:0,name:"laili",auth:0},{id:1,name:"laili",auth:0},{id:2,name:"laili",auth:1}],
            active : 0,
            dropdownOpen : [false,false],
            newtab : [],
            currnetname : ''
        }
    }

    toggle = ()=>{
        this.setState({
            modal:!this.state.modal
        })
    }

    toggletab = (i,channel)=>{
        this.setState({
            active : i,
            currnetname : channel
        })
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
        const newarr = [...this.state.navItems,{name:'newtab',auth:0,id:Date.now()}];
        this.setState({
            navItems: newarr,
            active : newarr.length - 1 ,
            currnetname : 'newtab'
        })
    }

    closetab = (id)=>{
        const index = this.state.navItems.findIndex(v=>v.id === id);
        console.log(index);
        let closetab = [...this.state.navItems];
        closetab.splice(index,1);
       
        this.setState({
            navItems: closetab
        })
    }

    render(){
        return(
            <>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className="channels">
                  <ModalHeader toggle={this.toggle} className="channelheader">Channels</ModalHeader>
                  <ModalBody className="channelswrap">
                        <Nav tabs>
                            {
                                this.state.navItems.length && this.state.navItems.map((v,i)=>{
                                    return(
                                        <NavItem key={i}>
                                        <NavLink href="#" active={this.state.active === i ? true : false} onClick={()=>{
                                            this.toggletab(i,v.name)
                                        }}>{v.name}
                                        <i className="fa fa-close" style={{marginLeft:'1rem'}} onClick={()=>{
                                             this.closetab(v.id)
                                        }}></i>
                                        </NavLink>
                                     </NavItem>
                                    )
                                //    if(!v.auth){
                                //         return( 
                                //         <NavItem key={i}>
                                //             <NavLink href="#" active={this.state.active === i ? true : false} onClick={()=>{
                                //                 this.toggletab(i,v.name)
                                //             }}>{v.name}
                                //             <i className="fa fa-close" style={{marginLeft:'1rem'}} onClick={()=>{
                                //                  this.closetab(i)
                                //             }}></i>
                                //             </NavLink>
                                //          </NavItem>
                                //         )
                                //     }
                                    // else{
                                    //     return(
                                    //       <Dropdown nav isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDrop(0);}} key={i}>
                                    //         <DropdownToggle nav caret>
                                    //             Dropdown
                                    //         </DropdownToggle>
                                    //         <DropdownMenu>
                                    //           {/* <DropdownItem header>Header</DropdownItem> */}
                                    //           <DropdownItem>plus</DropdownItem>
                                    //           {/* <DropdownItem divider /> */}
                                    //           <DropdownItem>delete</DropdownItem>
                                    //         </DropdownMenu>
                                    //       </Dropdown>           
                                    //     )
                                    // }
                                })
                            //     (<NavItem>
                            //         <NavLink href="#" active>newtab</NavLink>
                            // </NavItem>)
                            }
                            <NavItem className="plus">
                                <i className="fa fa-plus" onClick={this.opentab}></i>
                            </NavItem>
                        </Nav>
                        <Section channel={this.state.currnetname}>
                            {
                                this.state.currnetname === 'newtab' ? (
                                <Search/>
                                // <InputGroup>
                                // <InputGroupAddon addonType="prepend">
                                //   <Button type="button" color="primary"><i className="fa fa-search"></i> search</Button>
                                // </InputGroupAddon>
                                // <Input type="text" id="input1-group2" name="input1-group2" placeholder="channel" />
                                // </InputGroup>
                                ) : ""
                            } 
                        </Section> 
                        <Input/>
                  </ModalBody>s
            </Modal>
         </>
        )
    }
}