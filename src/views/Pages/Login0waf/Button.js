import React from 'react';
import { Button } from 'reactstrap';

export default (props)=>{
   const { sendCode, isOpen, signin, isSignUp } = props;
   function ButtonCom() {
        if (isOpen && !isSignUp) {
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
           return <Button color="primary" onClick={sendCode}>Enter</Button>;
   }
   return(
        <div className="loginItem">
                <ButtonCom />
        </div>
   )
};
