import React from 'react';
import { Button } from 'reactstrap';
export default (props)=>{
   const { sendCode, isOpen, signin } = props;
   return(
        <div className="loginItem">
                {
                isOpen? 
                <Button color="primary" onClick={signin}>Sign In</Button> :
                <Button color="primary" onClick={sendCode}>Enter</Button>
                }
        </div>
   )
}