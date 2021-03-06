import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import propTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import debounce from 'debounce';

const sendCode = gql`
mutation sendVerifyCode($email: String!, $type: String!){
    sendVerifyCode(email: $email, type: $type)
}`;

const resetPassword = gql`
mutation sendVerifyCode($email: String!, $type: String!){
    sendVerifyCode(email: $email, type: $type)
}`;

function Email(props) {
    const { onChangeEmailValue, onKeyDown, isCorrect, isOpen, isSignUp, email, forget } = props;
    let [time, setTime] = useState(60);

    const handleSendCode = debounce((sendCode) => {
        sendCode();
        let timer = null;
        timer = setInterval(() => {
            time = time - 1;
            setTime(time);
            if (time === 0) {
                clearInterval(timer);
                setTime(60);
            }
        }, 1000);
    }, 1000);

    const EmailCode = ({ time, sendCode }) => {
        if (time === 60) {
            return (
                <InputGroupAddon addonType="append" className="email-code" onClick={() => handleSendCode(sendCode)}>
                    <InputGroupText>
                        send
                    </InputGroupText>
                </InputGroupAddon>
            );
        }
        if (time === 0) {
            return (
                <InputGroupAddon addonType="append" className="email-code" onClick={() => handleSendCode(sendCode)}>
                    <InputGroupText>
                        resend
                    </InputGroupText>
                </InputGroupAddon>
            );
        }
        return (
            <InputGroupAddon addonType="append">
                <InputGroupText>
                    {time}s
                </InputGroupText>
            </InputGroupAddon>
        );
    }

    let mutation = sendCode;
    let variables = { email };
    if (isSignUp && !forget) {
        mutation = sendCode;
        variables.type = 'ACTIVE_EMAIL';
    }

    
    if (!isSignUp && forget) {
        mutation = resetPassword;
        variables.type = 'RESET_PASSWORD';
    }

    return (
        <InputGroup style={{margin : '1.3rem 0', position: 'relative' }}>
            <InputGroupAddon addonType="append">
                <InputGroupText>
                    <i className="fa fa-envelope-o"></i> 
                </InputGroupText>
            </InputGroupAddon>
            <Input type="email" id="email" name="email" placeholder="Email" required 
                onChange={onChangeEmailValue}
                autoFocus spellCheck={false}
                onKeyDown={onKeyDown}
            />
            {
                ((isSignUp && isOpen) || (forget && isOpen)) && (
                    <Mutation mutation={mutation} variables={variables}>
                        {
                            (sendCode) => {
                                return (
                                    <EmailCode time={time} sendCode={sendCode} />
                                );
                            }
                        }
                    </Mutation>
                )}
            <span 
            style={{ 
                position: 'absolute', left: 0, fontSize: '12px', color: 'red', bottom: -18,
                display: isCorrect ? 'none' : 'inline-block'
            }}>Please enter the correct email format</span>
        </InputGroup> 
    );
}

Email.propTypes = {
    onChangeEmailValue: propTypes.func.isRequired,
    onKeyDown: propTypes.func.isRequired,
    isCorrect: propTypes.bool.isRequired,
    isOpen: propTypes.bool.isRequired,
    isSignUp: propTypes.bool.isRequired,
    email: propTypes.string.isRequired,
    forget: propTypes.bool.isRequired,
}

export default Email;
