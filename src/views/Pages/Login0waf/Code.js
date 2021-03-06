import React, { useState } from 'react';
import debounce from 'debounce';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import gql from "graphql-tag";
import Remember from '../Remember';
import client from '../../../client';
import "antd/dist/antd.css";

function Code (props) {
    const { email, isOpen, onChangeCodeValue, onKeyDownCode, isSignUp, isNknLogin, onRemember, forget, onForget, onLogin } = props;
    let [time, setTime] = useState(60);
    const handleTime = debounce(() => {
        let timer = null;
        if (time === 60) {
            const sendNknCode = gql`
                mutation sendLoginCode($email: String!) {
                    sendLoginCode(email: $email)
                }
            `;
            client.mutate({
                mutation: sendNknCode,
                variables: { email },
                errorPolicy: 'all',
            });
            timer = setInterval(() => {
                time = time - 1;
                setTime(time);
                if (time === 0) {
                    clearInterval(timer);
                    setTime(60);
                }
            }, 1000);
        }
    }, 1000);

    const SendCom = (value) => {
        if (value === 60) {
            return (
                <InputGroupAddon addonType="append" onClick={handleTime} style={{ cursor: 'pointer' }}> 
                    <InputGroupText>send</InputGroupText>
                </InputGroupAddon>
            );
        }
        if (value === 0) {
            return (
                <InputGroupAddon addonType="append" onClick={handleTime} style={{ cursor: 'pointer' }}> 
                    <InputGroupText>resend</InputGroupText>
                </InputGroupAddon>
            );
        }
        return (
             <InputGroupAddon addonType="append"> 
                <InputGroupText>{time}s</InputGroupText>
            </InputGroupAddon>
        );
    }

    if (isOpen && !isSignUp && !isNknLogin && !forget) {
        return (
            <InputGroup>
                <InputGroupAddon addonType="append">
                    <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                </InputGroupAddon>
                <Input type="loginCode" id="sig" name="loginCode" placeholder="loginCode" autoComplete="current-password"
                    onChange={onChangeCodeValue} spellCheck={false}
                    onKeyDown={onKeyDownCode}
                />
                {SendCom(time)}
            </InputGroup>
        );
    }


    if (isOpen && !isSignUp && isNknLogin && !forget) {
        return (
            <>
                <InputGroup>
                    <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="sig" name="password" placeholder="password" autoComplete="current-password"
                        onChange={onChangeCodeValue} spellCheck={false}
                        onKeyDown={onKeyDownCode}
                    />
                </InputGroup>

                <Remember onRemember={onRemember} onForget={onForget} forget={forget} onLogin={onLogin} />
            </>
        );
    }
    if (isSignUp && isOpen && !forget) {
        return (
            <>
                <InputGroup style={{ marginBottom: '18px' }}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="code" name="code" placeholder="email code"
                        onChange={onChangeCodeValue} spellCheck={false}
                    />
                </InputGroup>
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

    if (forget && isOpen && !isSignUp) {
        return (
            <>
                <InputGroup style={{ marginBottom: '18px' }}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="code" name="code" placeholder="email code"
                        onChange={onChangeCodeValue} spellCheck={false}
                    />
                </InputGroup>
                <InputGroup style={{ marginBottom: '18px' }}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="sig" name="newPassword" placeholder="new password" autoComplete="current-password"
                        onChange={onChangeCodeValue} spellCheck={false}
                    />
                </InputGroup>
                {/* <InputGroup>
                    <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="validate-sig" name="validatePassword" placeholder="validate new password" autoComplete="current-password"
                        onChange={onChangeCodeValue} spellCheck={false}
                        onKeyDown={onKeyDownCode}
                    />
                </InputGroup> */}
                <Remember onForget={onForget} onRemember={onRemember} forget={forget} onLogin={onLogin} />
            </>
        );
    }
    return null;
}

export default Code;
