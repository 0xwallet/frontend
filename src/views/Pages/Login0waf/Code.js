import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';

export default (props)=>{
    const { isOpen, onChangeCodeValue, onKeyDownCode, isSignUp } = props;
    if (isOpen && !isSignUp) {
        return (
            <InputGroup>
                <InputGroupAddon addonType="append">
                    <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                </InputGroupAddon>
                <Input type="password" id="sig" name="password" placeholder="password" autoComplete="current-password"
                    onChange={onChangeCodeValue} spellCheck={false}
                    onKeyDown={onKeyDownCode}
                />
            </InputGroup>
        );
    }
    if (isSignUp && isOpen) {
        return (
            <>
                <InputGroup style={{ marginBottom: '18px' }}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="sig" name="password" placeholder="password" autoComplete="current-password"
                        onChange={onChangeCodeValue} spellCheck={false}
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="validate-sig" name="validatePassword" placeholder="validate password" autoComplete="current-password"
                        onChange={onChangeCodeValue} spellCheck={false}
                        onKeyDown={onKeyDownCode}
                    />
                </InputGroup>
            </>
        );
    }
    return null;
}
