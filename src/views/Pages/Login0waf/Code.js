import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
export default (props)=>{
    const { isOpen, onChangeCodeValue, onKeyDownCode } = props;
    return isOpen?
    <InputGroup>
        <InputGroupAddon addonType="append">
            <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
        </InputGroupAddon>
        <Input type="password" id="sig" name="password" placeholder="password" autoComplete="current-password"
            onChange={onChangeCodeValue} spellCheck={false}
            onKeyDown={onKeyDownCode}
        />
    </InputGroup> : (null)
}

