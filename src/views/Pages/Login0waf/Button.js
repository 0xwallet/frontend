import React from 'react';
import { Button } from 'reactstrap';
export default (props)=>{
   const { openCodeInput, isOpen } = props;
   return(
        <div className="loginItem">
                {
                isOpen? 
                <Button color="primary" onClick={openCodeInput}>Sign In</Button> :
                <Button color="primary" onClick={openCodeInput}>Enter</Button>
                }
        </div>
   )
}