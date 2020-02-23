import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
// import nknWallet from 'nkn-wallet';
import gql from "graphql-tag";
import { Form, Modal, ModalBody, ModalHeader, Button, ModalFooter, Input } from 'reactstrap';
import { Mutation, graphql } from "react-apollo";
import { Tooltip } from 'antd';
import client from '../../../client';
import { GET_CURRENT_USER_QUERY } from "../../../components/CurrentUser";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import Email from './Email';
import Code from './Code';
import Logo from './Logo';
import ButtonCom from './Button';
import './index.scss';
import "antd/dist/antd.css";

const nknWallet = require('nkn-wallet');

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String, $loginCode: String) {
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
mutation setdefaultaddr($password: String!, $walletId: String!){
    setDefaultNknAddress(password: $password, walletId: $walletId, tag: MESSAGE){
      info{
        address,
        identifier,
        publicKey
      }
    }
}
`;

// 绑定nknaddr
// const bindAddr = gql`
// mutation bindNknAddr($nknAddress: String!){
//     bindNknAddress(nknAddress: $nknAddress){
//       id,
//     }
// }`;


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
        sendLoginCode: "",
        publickey: '',
    };

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
            // client.mutate({
            //     mutation: bindNknAddr,
            //     variables: { nknAddress: `${data.signup.user.username}.${wallet.getPublicKey()}`}
            // }).then(res => {
            //     console.log(res, '已经绑定了唯一的地址');
            // });
            client.mutate({
                mutation: bindNknAddr,
                variables: { nknAddress: `${data.signup.user.username}.${wallet.getPublicKey()}`}
            }).then(res => {
                console.log(res, '已经绑定了唯一的地址 nkn bind');
                client.mutate({
                    mutation: setDefaultNknAddr,
                    variables: { password, walletId: res.data.bindNknAddress.id }
                }).then(res => {
                    console.log(res, '已经设置绑定了唯一的地址, nkn setDefault');
                })
            });
            client.query({
                query: GET_CURRENT_USER_QUERY,
            }).then((res) => {
                console.log(res, 'client query login');
                this.props.history.push('/dashboard')
            });
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
        const { data: { sendLoginCode } } = await sendCode();
        this.setState({
            sendLoginCode,
        });
        this.nknLogin();
    }

    handleChangeCode = (e) => {
        this.setState({
            nknCode: e.target.value,
        });
    }

    nknModal() {
        const { nknCode, email, nknModal, sendLoginCode } = this.state;
        return (
            <Mutation 
                mutation={SIGNIN_MUTATION} 
                variables={{
                    loginCode: nknCode,
                    email,
                }}
                onCompleted={this.handleCompleted}
                update={this.handleUpdate}
            >
                {(signin, {loading, error}) => {
                    if (loading) return (
                        <Modal isOpen={nknModal} toggle={this.nknLogin}>
                            <ModalHeader>Nmobile</ModalHeader>
                            <ModalBody>
                                <Loading />
                            </ModalBody>
                        </Modal>
                    );
                    if (error) return (
                        <Modal isOpen={nknModal} toggle={this.nknLogin}>
                            <ModalHeader toggle={this.nknLogin}>Nmobile</ModalHeader>
                            <ModalBody>
                                <Input type="text" placeholder="please input your code" onChange={this.handleChangeCode} />
                                <Error error={error} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.loginInByNknCode(signin)}>login</Button>{' '}
                                <Button color="secondary" onClick={this.nknLogin}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    );
                    return (
                        <Modal isOpen={nknModal} toggle={this.nknLogin}>
                            <ModalHeader toggle={this.nknLogin}>Nmobile</ModalHeader>
                            <ModalBody>
                                { 
                                    sendLoginCode 
                                ?   <Tooltip title={sendLoginCode}>{sendLoginCode.slice(0, 16)}...</Tooltip> 
                                    : ''
                                }
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
        // 对邮箱进行切割
        const emails = email && email.split('@');
        const variables = !isSignUp ? { email, password } : { email, password, username: emails[0] };
        return (
            <Mutation
                mutation={mutation}
                variables={variables}
                onCompleted={this.handleCompleted}
                update={this.handleUpdate}>
                {(signin, { loading, error }) => {
                if (loading) return <Loading />;
                if (error) return  <Error error={error} />;
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
                                        signin().then(() => {
                                            this.props.history.push('/dashboard');
                                        }).catch((e) => {
                                            console.log(e);
                                        });
                                    }
                                    signin().then(() => {
                                        this.props.history.push('/dashboard');
                                    }).catch((e) => {
                                        console.log(e);
                                    });
                                }} isSignUp={isSignUp} />
                                {
                                    isOpen && (
                                        <div className="loginItem wenauthn">
                                            <span className="webauthn">WebAuthn</span>
                                            <Mutation 
                                                mutation={sendNknCode}
                                                variables={{
                                                    email,
                                                }}
                                            >
                                                {
                                                    (sendCode, { loading, error }) => {
                                                        if (loading) return 'loading';
                                                        if (error) return <Error error={error} />;
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

const newJobOperation = graphql(setDefaultNknAddr, {
    props: ({ mutate }) => ({   //mutate为自带参数
        addJob: factor => mutate({  //自定义addJob并接受从视图页传来的factor,在视图也可直接使用this.props.addJob(args)来调用该方法
        variables: factor,  //修改参数
        }),
    }),
})(withRouter(Login0waf));

export default newJobOperation;