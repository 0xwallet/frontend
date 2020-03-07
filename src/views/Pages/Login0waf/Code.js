import React, { useState, useImperativeHandle, useEffect } from 'react';
import debounce from 'debounce';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import gql from "graphql-tag";
import client from '../../../client';

function Code (props) {
    const { email, isOpen, onChangeCodeValue, onKeyDownCode, isSignUp, isNknLogin } = props;
    let [time, setTime] = useState(5);
    const [start, setStart] = useState(false);
    const handleTime = debounce(() => {
        let timer = null;
        setStart(true);
        if (start && time === 5) {
            const sendNknCode = gql`
                mutation sendLoginCode($email: String!) {
                    sendLoginCode(email: $email)
                }
            `;
            client.mutate({
                mutation: sendNknCode,
                variables: { email },
            })
        }
        timer = setInterval(() => {
            time = time - 1;
            setTime(time);
            if (time === 0) {
                clearInterval(timer);
                setTime(5);
            }
        }, 1000);
    }, 1000);

    useEffect(() => {
        if (start) {
            handleTime();
        }
    }, [start])

    useImperativeHandle(props.cref, () => {
        return {
            resend: () => setStart(true),
        }
    });

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
    return null;
}

export default Code;
