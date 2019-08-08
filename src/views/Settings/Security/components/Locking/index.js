import React,{PureComponent} from 'react';
import { Modal ,ModalHeader,ModalBody,Input} from 'reactstrap';
// import { AppSwitch } from '@coreui/react';

export default class Locking extends PureComponent{
    state = {
        isOpen: false,
    }

    handleIsOpen = (e)=>{
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    handleVerify = (e)=>{
        if(e.target.value === "laoli"){
            this.setState({
                isOpen: false
            })
            this.props.onAuth();
        }
    }

    closelocking = ()=>{
        this.props.onAuth()
    }

    render(){
        const {isOpen} = this.state;
        return(
            <div>
                {
                !this.props.auth?  <i className="cui-lock-locked icons font-2xl d-block" onClick={this.handleIsOpen}></i>
                :<i className="cui-lock-unlocked icons font-2xl d-block " onClick={this.closelocking}></i> 
                }
                {/* <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} size={'sm'} checked={this.state.isok} onChange={this.handleIsOpen}/> */}
                <Modal isOpen={isOpen}>
                    <ModalHeader toggle={this.handleIsOpen}>vefiry code</ModalHeader>
                    <ModalBody>
                        <div>
                             <Input placeholder="input your verify code" onChange={(value)=>this.handleVerify(value)} maxLength={6}/>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}