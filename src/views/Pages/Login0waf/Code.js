import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
export default (props)=>{
    const { isOpen } = props;
    return isOpen?
    <InputGroup>
        <InputGroupAddon addonType="append">
            <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
        </InputGroupAddon>
        <Input type="text" id="sig" name="verification" placeholder="Verification Code" autoComplete="current-password"/>
    </InputGroup> : (null)
}

