import React from 'react';
import {Modal,ModalBody,ModalHeader,Input} from 'reactstrap';

export default (props)=>{
    const {isOpen,toggle,user,sendInput} = props;
    // const receiveMsg = JSON.parse(localStorage.getItem('ReceivedMsg')) || [];
    // const sendMsg = JSON.parse(localStorage.getItem('sendMsg')) || [];
    // console.log(localStorage.getItem('ReceivedMsg'));
    return(
        <Modal isOpen={isOpen}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                <h5>{user}</h5>
                {/* {
                    receiveMsg.map((v,i)=>{
                        return(
                            <div>{v}</div>
                        )
                    })
                }
                {
                    sendMsg.map((v,i)=>{
                        return(
                            <div>{v}</div>
                        )
                    })
                } */}
                <Input onKeyDown={sendInput}/>
            </ModalBody>
        </Modal>
    )
}