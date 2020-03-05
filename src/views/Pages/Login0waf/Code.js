import React, { useState } from 'react';
import debounce from 'debounce';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';

function Code (props) {
    const { isOpen, onChangeCodeValue, onKeyDownCode, isSignUp, isNknLogin, sendNknCode } = props;
    let [time, setTime] = useState(5);

    const handleTime = debounce(() => {
        let timer = null;
        sendNknCode();
        if (timer) {
            clearInterval(timer)
        } else {
            timer = setInterval(() => {
                time = time - 1;
                setTime(time);
                if (time === 0) {
                    clearInterval(timer);
                    setTime(5);
                }
            }, 1000);
        }
        
    }, 1000)

    if (isOpen && !isSignUp && !isNknLogin) {
        return (
            <InputGroup>
                <InputGroupAddon addonType="append">
                    <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                </InputGroupAddon>
                <Input type="loginCode" id="sig" name="loginCode" placeholder="loginCode" autoComplete="current-password"
                    onChange={onChangeCodeValue} spellCheck={false}
                    onKeyDown={onKeyDownCode}
                />
                {
                    time === 5 ? (
                        <InputGroupAddon addonType="append" onClick={handleTime}> 
                            <InputGroupText>resend</InputGroupText>
                        </InputGroupAddon>
                    ) : (
                        <InputGroupAddon addonType="append"> 
                            <InputGroupText>{time}s</InputGroupText>
                        </InputGroupAddon>
                    )
                }
               
            </InputGroup>
        );
    }


    if (isOpen && !isSignUp && isNknLogin) {
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

export default Code;
