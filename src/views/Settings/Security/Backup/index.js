import React,{ useState } from 'react';
import propType from 'prop-types';
import {Card,CardHeader,CardBody,Input,Form,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap';
import PhoneInput from 'react-phone-number-input';
import { message } from 'antd';
import gql from "graphql-tag";
import client from '../../../../client';
import Locking from '../components/Locking';
import 'react-phone-number-input/style.css';
import "antd/dist/antd.css";
const bindNknAddr = gql`
mutation bindnkn($nknAddress: String!){
    bindNknAddress(nknAddress: $nknAddress){
      id,
    }
}
`;

const setDefaultNknAddr = gql`
mutation setdefaultaddr($password: String!, $walletId: String!, $tag: String!, $loginCode: String!){
    setDefaultNknAddress(password: $password, walletId: $walletId, tag: $tag, loginCode: $loginCode){
      info{
        address,
        identifier,
        publicKey
      }
    }
}
`;

const sendNknCode = gql`
    mutation sendLoginCode($email: String!, $walletId: String!) {
        sendLoginCode(email: $email, walletId: $walletId)
    }
`;

function Backup(props) {
    const { auth, onAuth, currentuser } = props;
    const [value, setValue] = useState('');
    const [code, openCode] = useState(false);
    const [params, setParams] = useState({});
    const [walletId, setWalletId] = useState(0);

    const handleInput = (e) => {
        if (e.keyCode === 13) {
            // 绑定以及发送验证码
            openCode(true);

            client.mutate({
                mutation: bindNknAddr,
                variables: { nknAddress: params.nknaddr }
            }).then(res => {
                console.log(res, '已经绑定了唯一的地址 nkn bind');
                const walletId = res.data.bindNknAddress.id;
                setWalletId(walletId);
                client.mutate({
                    mutation: sendNknCode,
                    variables: { walletId, email: currentuser.email }
                }).then((res) => {
                    console.log('send code', res);

                })
            });
        }
    }

    const handleChange = (e) => {
        setParams({...params, [e.target.name]: e.target.value})
    }

    const handleLock = () => {
        client.mutate({
            mutation: setDefaultNknAddr,
            variables: { password: params.pass, walletId, loginCode: params.loginCode, tag: "LOGIN_CODE" }
        }).then(res => {
            message.success('success');
            openCode(false);
        }).catch((e) => {
           message.error('bind error');
           openCode(false);
        })
    }

    const lockProps = {
        auth,
        onAuth,
        handleLock,
    };

    return(
        <Card className="keys">
        <CardHeader>My Contact
        <div className="card-header-actions">
            <Locking {...lockProps} />
        </div>
        </CardHeader>
        <CardBody>
            <div className="backup"> 
                <Form row="true" id="login">
                {/* <InputGroup style={{margin : '1.3rem 0'}}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            <i className="cui cui-phone"></i> 
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="email" id="email" name="phone" placeholder="phone" disabled={auth?false:true}/>            
                </InputGroup> */}
                <PhoneInput placeholder="Enter phone number" value={ value } onChange={ phone => setValue( phone) }
                disabled={auth?false:true}/>
                <InputGroup style={{margin : '1.3rem 0'}}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            <i className="cui-laptop"></i> 
                        </InputGroupText>
                    </InputGroupAddon> 
                    <Input type="text" onChange={handleChange} id="nknaddr" name="nknaddr" placeholder="nkn addr" disabled={auth ? false : true} onKeyDown={handleInput} />   
                   
                </InputGroup>
                {
                    code && (
                        <>
                            <InputGroup style={{margin : '1.3rem 0'}}>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <i className="cui-laptop"></i> 
                                    </InputGroupText>
                                </InputGroupAddon> 
                                <Input type="text" onChange={handleChange} id="backupcode" name="loginCode" placeholder="code" disabled={auth ? false : true} />   
                         
                            </InputGroup>
                            <InputGroup style={{margin : '1.3rem 0'}}>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <i className="cui-laptop"></i> 
                                    </InputGroupText>
                                </InputGroupAddon> 
                                <Input type="password" onChange={handleChange} id="backuppass" name="pass" placeholder="password" disabled={auth ? false : true} /> 
                            </InputGroup>
                        </>
                    )}   
                </Form>
            </div>
        </CardBody>
        </Card>
    )
}

Backup.propTypes = {
    auth: propType.bool.isRequired,
    onAuth: propType.func.isRequired,
    currentuser: propType.any.isRequired,
}

export default Backup;
