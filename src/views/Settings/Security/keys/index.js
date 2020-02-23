import React ,{PureComponent}from 'react';
import {
    Card,CardHeader,CardBody,Button,Input,
    ModalBody, ModalFooter, ModalHeader, Modal,
} from 'reactstrap';// ListGroupItem
import gql from "graphql-tag";
import { message } from 'antd';
import client from '../../../../client';
import Locking from '../components/Locking';
import './index.scss';
import "antd/dist/antd.css";

message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
});

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

const LAUNCHES_QUERY = gql`
query me{
    me{
        avatar,
        email,
        username,
        wallets{
            id,
            info{
                publicKey,
                identifier
            },
            tags,
        }
    }
}
`;

export default class Keys extends PureComponent{
    state = {
        keys: [],
        nknAddr: '',
        nkncode: '',
        bindpass: '',
        bindSucc: false,
        walletId: 0,
        wallets: [],
    };

    componentDidMount() {
        client.query({
            query: LAUNCHES_QUERY,
        }).then((res) => {
            const { wallets, email } = res.data.me;
            this.setState({
                wallets,
                email,
            })
        }) 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleBind = () => {
        const { nknAddr, email } = this.state; 
        const that = this;
        client.mutate({
            mutation: bindNknAddr,
            variables: { nknAddress: nknAddr }
        }).then(res => {
            console.log(res, '已经绑定了唯一的地址 nkn bind');
            const walletId = res.data.bindNknAddress.id;
            that.setState({
                walletId,
            });

            client.mutate({
                mutation: sendNknCode,
                variables: { email, walletId }
            }).then((res) => {
                console.log('send code', res);
                // if (res.data.sendLoginCode !== 'user offline') {
                //     that.setState({
                //         bindSucc: true,
                //     })
                // }
                // if (res.data.sendLoginCode === 'user offline') {
                //     message.error('user offline')
                // }
                that.setState({
                    bindSucc: true,
                })
            })

            // client.query({
            //     query: LAUNCHES_QUERY,
            // }).then((res) => {
            //     console.log('res info', res);
            //     const wallets = res.data.me.wallets;
            //     that.setState({
            //         wallets,
            //     });
            // })

            // client.mutate({
            //     mutation: sendNknCode,
            //     variables: { walletId: res.data.bindNknAddress.id, email: localStorage.getItem()}
            // })
            // client.mutate({
            //     mutation: setDefaultNknAddr,
            //     variables: { password, walletId: res.data.bindNknAddress.id, loginCode: code, }
            // }).then(res => {
            //     console.log(res, '已经设置绑定了唯一的地址, nkn setDefault');
            //     this.toggle();
            // })
        });
    }

    addkeys = () => {
        const { toggle } = this.props;
        const { bindpass, nkncode, walletId } = this.state; 
        const that = this;
        client.mutate({
            mutation: setDefaultNknAddr,
            variables: { password: bindpass, walletId, loginCode: nkncode, tag: "LOGIN_CODE" }
        }).then(res => {
            console.log(res, '已经设置绑定了唯一的地址, nkn setDefault');
            toggle();
        }).catch(() => {
            that.setState({
                bindSucc: false,
            })
        })
    }

    modalBindNkn = () => {
        const { open, toggle } = this.props;
        const { bindSucc } = this.state;
        return (
            <Modal isOpen={open} toggle={toggle}>
            <ModalHeader toggle={toggle}>Bind Nkn Addr for login</ModalHeader>
            <ModalBody>
                
                {
                    bindSucc ? (
                        <>
                            <Input type="text" onChange={this.handleChange} placeholder="please input nkn addr" style={{ marginBottom: '5px' }} id="nknAddr" />
                            <Input type="text" onChange={this.handleChange} placeholder="please input nkn code" style={{ marginBottom: '5px' }} id="nkncode" />
                            <Input type="password" onChange={this.handleChange} placeholder="please input your password" id="bindpass" />
                        </>
                    ) : (
                        <>
                            <Input type="text" onChange={this.handleChange} placeholder="please input nkn addr" style={{ marginBottom: '5px' }} id="nknAddr" />
                            <Button color="primary" onClick={this.handleBind}>send code</Button>
                        </>
                    )
                }
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.addkeys}>Ok</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        );
    }

    render(){
        const {auth = false, onAuth, toggle } =this.props;
        const { wallets } = this.state;
        return(
        <Card className="keys">
            <CardHeader>Keys
            <div className="card-header-actions">
                <Locking onAuth={onAuth} auth={auth}/>
            </div>
            </CardHeader>
            <CardBody>
                <div className="keysbtn"> 
                        {
                            wallets.filter(v => v.tags.length !== 0 && v.tags[0] === 'LOGIN_CODE').map((v,idx)=>{
                                return(
                                <div key={idx} style={{display: 'flex',alignItems: 'center',marginBottom:'.5rem',justifyContent:'space-between'}}>
                                    <Input defaultValue={v.info.publicKey} type="text" disabled style={{width:'97%'}}/> 
                                    <span>{v.tags[0]}</span>
                                    {/* <i className="fa fa-close"></i> */}
                                </div>
                                )
                            })
                        }
                    <Button color="primary" className="add" onClick={toggle} disabled={auth?false:true}>Add Nkn Addr for login</Button>
                </div>
                {this.modalBindNkn()}
            </CardBody>
        </Card>
        )   
    }
}
