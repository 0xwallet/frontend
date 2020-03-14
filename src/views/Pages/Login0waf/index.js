import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import gql from "graphql-tag";
import { Form, Modal, ModalBody, ModalHeader, Input, Spinner } from 'reactstrap';
import { Mutation, graphql } from "react-apollo";
import { Tooltip, message } from 'antd';
import InputGroup from 'react-input-groups';
import client from '../../../client';
import { GET_CURRENT_USER_QUERY } from "../../../components/CurrentUser";
import Loading from "../../../components/Loading";
// import Error from "../../../components/Error";
import Email from './Email';
import Code from './Code';
import Logo from './Logo';
import ButtonCom from './Button';
import './index.scss';
import "antd/dist/antd.css";
import 'react-input-groups/lib/css/styles.css'

const nknWallet = require('nkn-wallet');

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String, $loginCode: String) {
    signin(email: $email, password: $password, loginCode: $loginCode) {
      token
      user {
        username,
        email,
      }
    }
  }
`;

const SIGNUP_MUTATION = gql`
    mutation signup($email: String!, $password: String!, $username: String!, $code: String!) {
        signup(email: $email, password: $password, username: $username, code: $code){
            token
            user {
                username,
                email,
            }
        }
    }
`;

const resetPassword = gql`
    mutation resetPassword($email: String!, $code: String!, $newPassword: String!) {
        resetPassword(email: $email, code: $code, newPassword: $newPassword){
            token
            user {
                username,
                email,
            }
        }
    }
`;

const sendNknCode = gql`
    mutation sendLoginCode($email: String!) {
        sendLoginCode(email: $email)
    }
`;

const bindNknAddr = gql`
mutation bindnkn($nknAddress: String!){
    bindNknAddress(nknAddress: $nknAddress){
      id,
    }
}
`;

const setDefaultNknAddr = gql`
mutation setdefaultaddr($password: String!, $walletId: String!, $tag: String!){
    setDefaultNknAddress(password: $password, walletId: $walletId, tag: $tag){
      info{
        address,
        identifier,
        publicKey
      }
    }
}
`;

class Login0waf extends PureComponent{
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        loginCode: "",
        openCodeInput: false,
        isCorrect: true,
        isSignUp: false,
        validatePassword: "",
        passwordError: false,
        nknModal: false,
        sendLoginCode: "",
        publickey: '',
        time: 60,
        isNknLogin: true,
        code: '', // email code,
        forget: false, // 重置
        remember: false, // 是否记住token
        newPassword: '',
      };

      this.codeRef = React.createRef();
    }

    handleForget = () => {
        this.setState({
            forget: true,
            isSignUp: false,
        })
    }

    handleRemember = () => {
        this.setState({
            remember: true,
        })
    }

    nknLogin = () => {
        this.setState({
            nknModal: !this.state.nknModal,
        })
    }

    loginInByNknCode = (signin) => {
        signin().then(() => {
            this.nknLogin();
        }).catch((e) => {
            console.log(e, 'ee')
        })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSignIn = () => {
      this.setState({
        isSignUp: false,
      })
    }

    signUp = () => {
        this.setState({
            isSignUp: true,
            isOpen: true,
            forget: false,
        });
    }

    handleKeyDown = event => {
        if (event.keyCode === 13) {
            this.sendCode();
        }
    };

    handleCompleted = data => {
        const { isSignUp, remember, forget } = this.state;  
        if (!isSignUp && !forget) {
            //  如果点击记住我就存储token
            if (remember) {
                localStorage.setItem("auth-token", data.signin.token);
                localStorage.setItem("username", data.signin.user.username);
            } else {
                console.log('no remember');
            }
        }
        if (isSignUp) {
            const { password, email } = this.state;
            const wallet = nknWallet.newWallet(password);
            localStorage.setItem("auth-token", data.signup.token);
            localStorage.setItem("username", data.signup.user.username);
            // 生成的公钥发送给服务器，私钥seed存在本地, 并帮用户创建一个默认的钱包用于记录消息客户端
            const walletAddr = wallet.address;
            const seedUseRestore = wallet.getSeed();
            const walletInfo = {
                seedUseRestore,
                walletAddr,
                publickey: wallet.getPublicKey(),
            };
            localStorage.setItem(email, JSON.stringify(walletInfo));
  
            client.mutate({
                mutation: bindNknAddr,
                variables: { nknAddress: `${data.signup.user.username}.${wallet.getPublicKey()}`}
            }).then(res => {
                client.mutate({
                    mutation: setDefaultNknAddr,
                    variables: { password, walletId: res.data.bindNknAddress.id, tag: "MESSAGE" }
                }).then(res => {
                })
            });
            client.query({
                query: GET_CURRENT_USER_QUERY,
            }).then((res) => {
                this.props.history.push('/dashboard')
            });
        }
        if (forget) {
            localStorage.setItem("auth-token", data.resetPassword.token);
            localStorage.setItem("username", data.resetPassword.user.username);
        }
    };
    
    handleUpdate = (cache, { data }) => {
        const { isSignUp, forget } = this.state;  
        if (!isSignUp && !forget) {
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
        if (forget) {
            cache.writeQuery({
                query: GET_CURRENT_USER_QUERY,
                data: { me: data.resetPassword.user }
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
            this.setState({
                isCorrect: false,
            });
        }
        if(email !== "" && reg.test(email)){
            this.setState({
                isCorrect: true,
            });
            this.openCodeInput()
        }
    }

    sendNknCode = () => {
        this.setState({
          isNknLogin: false,
          isSignUp: false,
        });
    }

    handleLogin = () => {
        this.setState({
            isSignUp: false,
            forget: false,
            isOpen: true,
        })
    }

    handlePassword = () => {
      this.setState({
        isNknLogin: true,
        isSignUp: false,
      })
    }

    getValue = (value, signin) => {
        this.setState({
            nknCode: value,
        })
        if (value.length === 6) {
            this.loginInByNknCode(signin)
        }
    }

    error = () => {
        return (
            <Tooltip title="username is not" className="webauthn">
                NKN
            </Tooltip>
        );
    }

    renderButton(isSignUp) {
        if (isSignUp) {
            return <span className="webauthn" onClick={this.handleSignIn}>Sign In</span> 
        }
        return <span className="webauthn" onClick={this.signUp}>Sign Up</span>
    }

    showError = (error) => {
        let messageTip = '';
        let detailTip = '';
        error.graphQLErrors.forEach(({ message, details }, i) => {
            messageTip += message;
            if (details && Array.isArray(details)) {
                {Object.keys(details).forEach(key => {
                    const detail = key + ' ' + details[key];
                    detailTip += detail;
                })}
            }
            if (details && typeof(details) === 'string') {
                detailTip = details;
            }
        })
        console.log(messageTip, detailTip);
        return messageTip + ',' +detailTip;
    }

    render() {
        const { forget, code, newPassword, loginCode, isNknLogin, openCodeInput: isOpen, email, password, isCorrect, isSignUp, validatePassword, passwordError } = this.state;
        // 对邮箱进行切割
        const emails = email && email.split('@');
        // const variables = !isSignUp ? { email, password } : { email, password, username: emails[0] };
        let variables = {};
        let mutation = SIGNIN_MUTATION;
        if (!isNknLogin && !isSignUp) {
          variables = {
            email,
            loginCode
          }
        }

        if (isNknLogin && !isSignUp) {
          variables = {
            email,
            password
          }
        }

        if (isSignUp) {
          variables = { email, password, username: emails[0], code };
          mutation = SIGNUP_MUTATION;
        }

        if (forget) {
            variables = { email, code, newPassword };
            mutation = resetPassword;
        }

        return (
            <Mutation
                mutation={mutation}
                variables={variables}
                errorPolicy="all"
                onCompleted={this.handleCompleted}
                update={this.handleUpdate}>
                {(signin, { loading, error }) => {
                // if (loading) return <Loading />;
                // if (error) return  <Error error={error} />;
                    return (
                        <div className="wrap">
                             <Form row="true" onSubmit={(e)=>{
                                 e.preventDefault();
                             }} id="login">
                                <Logo />
                                <Email
                                    forget={forget}
                                    email={email}
                                    isSignUp={isSignUp}
                                    isOpen={isOpen} 
                                    onChangeEmailValue={this.handleChange} onKeyDown={this.handleKeyDown} isCorrect={isCorrect} />
                                <Code
                                    onLogin={this.handleLogin}
                                    email={email}
                                    cref={this.codeRef}
                                    isOpen={isOpen}
                                    onChangeCodeValue={this.handleChange}
                                    onRemember={this.handleRemember}
                                    isSignUp={isSignUp}
                                    forget={forget}
                                    onForget={this.handleForget}
                                    isNknLogin={isNknLogin}
                                    sendNknCode={this.sendNknCode}
                                    onKeyDownCode={(e) => {
                                        if (e.keyCode === 13) {
                                            if (!isNknLogin && !isSignUp) {
                                                signin();
                                                this.props.history.push('/dashboard')
                                            }
                                    
                                            if (isNknLogin && !isSignUp) {
                                                signin();
                                                this.props.history.push('/dashboard')
                                            }
                                    
                                            if (isSignUp) {
                                                if (validatePassword !== password) {
                                                    this.handlePasswordError(true);
                                                    return false;
                                                }
                                                if (password === '') {
                                                  return false;
                                                }
                                                if (!password || !validatePassword) {
                                                  this.handlePasswordError(true);
                                                  return false;
                                                }
                                                this.handlePasswordError(false);
                                                signin();
                                                this.props.history.push('/dashboard')
                                            }
                                        }
                                    }}
                                /> 
                                {
                                    passwordError && <span style={{ color: 'red' }}>Please enter the same password and can't not null</span>
                                }
                                <ButtonCom sendCode={this.sendCode} isOpen={isOpen} forget={forget} signin={() => {
                                    if (!isNknLogin && !isSignUp) {
                                        signin().then(() => {
                                        this.props.history.push('/dashboard');
                                        }).catch((e) => {
                                            message.error(this.showError(e));
                                        });
                                    }
                            
                                    if (isNknLogin && !isSignUp) {
                                        signin().then(() => {
                                            this.props.history.push('/dashboard');
                                        }).catch((e) => {
                                            message.error(this.showError(e));
                                        });
                                    }
                            
                                    if (isSignUp) {
                                        if (validatePassword !== password) {
                                            this.handlePasswordError(true);
                                            return false;
                                        }
                                        if (password === '') {
                                          this.handlePasswordError(true);
                                          return false;
                                        }
                                        if (!password || !validatePassword) {
                                          this.handlePasswordError(true);
                                          return false;
                                        }
                                        this.handlePasswordError(false);
                                        signin().then(() => {
                                            this.props.history.push('/dashboard');
                                        }).catch((e) => {
                                            message.error(this.showError(e));
                                        });
                                    }
                                }} isSignUp={isSignUp} />
                                {
                                    isOpen && (
                                        <div className="loginItem wenauthn">
                                            <Tooltip title="Login with FIDO Authentication Key.">
                                                <span className="webauthn">WebAuthn</span>
                                            </Tooltip>
                                            {
                                              isNknLogin ? (
                                                <Mutation 
                                                    mutation={sendNknCode}
                                                    variables={{
                                                        email,
                                                    }}
                                                    errorPolicy="all"
                                                >
                                                    {
                                                        (sendCode, { loading, error }) => {
                                                            if (loading) return <><Spinner type="grow" color="primary" /></>;
                                                            if (error) return this.error(error);
                                                            return (
                                                                <Tooltip title="Login with NKN Verification Code.">
                                                                    <span className="webauthn" onClick={() => this.sendNknCode(sendCode, false)}>NKN</span>
                                                                </Tooltip>
                                                            );
                                                        }
                                                    }
                                                  </Mutation>
                                              ) : (
                                                <span className="webauthn" onClick={this.handlePassword}>password</span>
                                              )
                                            }
                                            {this.renderButton(isSignUp)}
                                        </div>
                                    )
                                }
                            </Form>
                        </div>
                    );
                }}
            </Mutation>
        )
    }
}

const newJobOperation = graphql(setDefaultNknAddr, {
    props: ({ mutate }) => ({   //mutate为自带参数
        addJob: factor => mutate({  //自定义addJob并接受从视图页传来的factor,在视图也可直接使用this.props.addJob(args)来调用该方法
        variables: factor,  //修改参数
        }),
    }),
})(withRouter(Login0waf));

export default newJobOperation;