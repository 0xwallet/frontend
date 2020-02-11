import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import gql from "graphql-tag";
import { Form, Modal, ModalBody, ModalHeader, Button, ModalFooter, Input } from 'reactstrap';
import { Mutation } from "react-apollo";
import { GET_CURRENT_USER_QUERY } from "../../../components/CurrentUser";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import Email from './Email';
import Code from './Code';
import Logo from './Logo';
import ButtonCom from './Button';

import './index.scss';

const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String, $loginCode: String) {
    signin(email: $email, password: $password, loginCode: $loginCode) {
      token
      user {
        username
      }
    }
  }
`;

const SIGNUP_MUTATION = gql`
    mutation signup($email: String!, $password: String!, $username: String!) {
        signup(email: $email, password: $password, username: $username){
            token
            user {
                username
            }
        }
    }
`;

const sendNknCode = gql`
    mutation sendLoginCode($username: String!) {
        sendLoginCode(username: $username)
    }
`;

class Login0waf extends PureComponent{
    state = {
        email: "",
        password: "",
        openCodeInput: false,
        isCorrect: true,
        isSignUp: false,
        validatePassword: "",
        passwordError: false,
        nknModal: false,
        nknCode: "",
    };

    nknLogin = () => {
        this.setState({
            nknModal: !this.state.nknModal,
        })
    }

    loginInByNknCode = async (signin) => {
        await signin();
        this.nknLogin();
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    signUp = () => {
        this.setState(preState => ({
            isSignUp: !preState.isSignUp,
        }))
    }

    handleKeyDown = event => {
        if (event.keyCode === 13) {
            this.sendCode();
        }
    };

    handleCompleted = data => {
        const { isSignUp } = this.state;  
        if (!isSignUp) {
            localStorage.setItem("auth-token", data.signin.token);
            localStorage.setItem("username", data.signin.user.username);
        }
        if (isSignUp) {
            localStorage.setItem("auth-token", data.signup.token);
            localStorage.setItem("username", data.signup.user.username);
        }  
    };
    
    handleUpdate = (cache, { data }) => {
        const { isSignUp } = this.state;  
        if (!isSignUp) {
            cache.writeQuery({
                query: GET_CURRENT_USER_QUERY,
                data: { me: data.signin.user }
            });
        }
        if (isSignUp) {
            cache.writeQuery({
                query: GET_CURRENT_USER_QUERY,
                data: { me: data.signup.user }
            });
        } 
    };

    handlePasswordError = (flag) => {
        this.setState({
            passwordError: flag,
        });
    }

    openCodeInput = ()=>{
        this.setState({
            openCodeInput: !this.state.openCodeInput
        })
    }

    // sendCode 
    sendCode = ()=>{
        const { email } = this.state;
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
        if(email === ""){
            this.setState({
                isCorrect: false,
            });
        }
        if(email !== "" && !reg.test(email)){
            console.log('format');
            this.setState({
                isCorrect: false,
            });
        }
        if(email !== "" && reg.test(email)){
            console.log('correct');
            this.setState({
                isCorrect: true,
            });
            this.openCodeInput()
        }
    }

    sendNknCode = async (sendCode) => {
        await sendCode();
        this.nknLogin();
    }

    handleChangeCode = (e) => {
        this.setState({
            nknCode: e.target.value,
        });
    }

    nknModal() {
        const { nknModal, nknCode, email } = this.state;
        return (
            <Mutation 
                mutation={SIGNIN_MUTATION} 
                variables={{
                    loginCode: nknCode,
                    email,
                }}
            >
                {(signin, {loading, error}) => {
                    if (loading) return 'loading';
                    if (error) return 'error';
                    return (
                        <Modal isOpen={nknModal} toggle={this.nknLogin}>
                            <ModalHeader toggle={this.nknLogin}>Nmobile</ModalHeader>
                            <ModalBody>
                                <Input type="text" placeholder="please input your code" onChange={this.handleChangeCode} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.loginInByNknCode(signin)}>login</Button>{' '}
                                <Button color="secondary" onClick={this.nknLogin}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    );
                }}
            </Mutation>
        );
    }

    render() {
        const { openCodeInput: isOpen, email, password, isCorrect, isSignUp, validatePassword, passwordError } = this.state;
        const mutation = !isSignUp ? SIGNIN_MUTATION : SIGNUP_MUTATION;
        const variables = !isSignUp ? { email, password } : { email, password, username: email };
        return (
            <Mutation
                mutation={mutation}
                variables={variables}
                onCompleted={this.handleCompleted}
                update={this.handleUpdate}>
                {(signin, { loading, error }) => {
                if (loading) return <Loading />;
                    return (
                        <div className="wrap">
                             <Form row="true" onSubmit={(e)=>{
                                 e.preventDefault();
                             }} id="login">
                                <Logo />
                                <Email onChangeEmailValue={this.handleChange} onKeyDown={this.handleKeyDown} isCorrect={isCorrect} />
                                <Code 
                                    isOpen={isOpen}
                                    onChangeCodeValue={this.handleChange}
                                    isSignUp={isSignUp}
                                    onKeyDownCode={(e) => {
                                        if (e.keyCode === 13) {
                                            if (isSignUp) {
                                                if (validatePassword !== password) {
                                                    this.handlePasswordError(true);
                                                    return false;
                                                }
                                                this.handlePasswordError(false);
                                                signin();
                                                this.props.history.push('/dashboard')
                                            }
                                            signin();
                                            this.props.history.push('/dashboard')
                                        }
                                    }} 
                                /> 
                                {
                                    passwordError && <span style={{ color: 'red' }}>Please enter the same password</span>
                                }
                                <Error error={error} />
                                <ButtonCom sendCode={this.sendCode} isOpen={isOpen} signin={() => {
                                    if (isSignUp) {
                                        if (validatePassword !== password) {
                                            this.handlePasswordError(true);
                                            return false;
                                        }
                                        this.handlePasswordError(false);
                                        signin();
                                        this.props.history.push('/dashboard')
                                    }
                                    signin();
                                    this.props.history.push('/dashboard')
                                }} isSignUp={isSignUp} />
                                {
                                    isOpen && (
                                        <div className="loginItem wenauthn">
                                            <span className="webauthn">WebAuthn</span>
                                            <Mutation 
                                                mutation={sendNknCode}
                                                variables={{
                                                    username: 'mike'
                                                }}
                                            >
                                                {
                                                    (sendCode, { loading, error }) => {
                                                        if (loading) return 'loading';
                                                        if (error) return 'error33';
                                                        return (
                                                            <span className="webauthn" onClick={() => this.sendNknCode(sendCode)}>NKN</span>
                                                        );
                                                    }
                                                }
                                            </Mutation>
                                            <span className="webauthn" onClick={this.signUp}>
                                                {
                                                    isSignUp ? 'Sign In' : 'Sign Up'
                                                }
                                            </span>
                                        </div>
                                    )
                                }
                            </Form>
                            {
                                this.nknModal()
                            }
                        </div>
                    );
                }}
            </Mutation>
        )
    }
}

export default withRouter(Login0waf);