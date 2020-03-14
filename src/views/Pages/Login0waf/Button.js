import React from 'react';
import { Button } from 'reactstrap';

function ButtonComs(props) {
   const { sendCode, isOpen, signin, isSignUp, forget } = props;
   function ButtonCom() {
        if (isOpen && !isSignUp && !forget) {
                return (
                        <Button color="primary" onClick={() => {
                                signin();
                        }}>Sign In</Button>
                );
           }
           if (isOpen && isSignUp) {
                return (
                        <Button color="primary" onClick={() => {
                                signin();
                        }}>Sign Up</Button>
                );
           }
           if (isOpen && !isSignUp && forget) {
                return (
                        <Button color="primary" onClick={() => {
                                console.log('重置');
                                signin();
                        }}>reset</Button>
                );
           }
           return <Button color="primary" onClick={sendCode}>Enter</Button>;
   }
   return(
        <div className="loginItem">
                <ButtonCom />
        </div>
   )
}

export default ButtonComs;
