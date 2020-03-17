import React ,{PureComponent}from 'react';
import {
    Card,CardHeader,CardBody,Button,Input,
    ModalBody, ModalFooter, ModalHeader, Modal,
} from 'reactstrap';// ListGroupItem
import gql from "graphql-tag";
import { message } from 'antd';
import classnames from 'classnames';
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
        loading: false,
    };

    componentDidMount() {
        client.query({
            query: LAUNCHES_QUERY,
        }).then((res) => {
            const { wallets, email } = res.data.me;
            this.setState({
                wallets,
                email,
            });
        });
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
            const walletId = res.data.bindNknAddress.id;
            that.setState({
                walletId,
            });
            that.setState({
                loading: true,
            });
            client.mutate({
                mutation: sendNknCode,
                variables: { email, walletId }
            }).then((res) => {
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
                    loading: false,
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
            toggle();
        }).catch(() => {
            that.setState({
                bindSucc: false,
            })
        })
    }

    handleClose = () => {
        this.props.toggle();
        this.setState({
            bindSucc: false,
        })
    }

    modalBindNkn = () => {
        const { open } = this.props;
        const { bindSucc, loading } = this.state;
        return (
            <Modal isOpen={open} toggle={this.handleClose}>
            <ModalHeader toggle={this.handleClose}>Bind Nkn Addr for login</ModalHeader>
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
                            <Button color="primary" onClick={this.handleBind}>{loading? 'loading' : 'send code'}</Button>
                        </>
                    )
                }
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.addkeys}>Ok</Button>{' '}
                <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
            </ModalFooter>
            </Modal>
        );
    }

    render(){
        const {auth = false, onAuth, toggle } =this.props;
        // const { wallets } = this.state;
        const keys = [{ name: 'Fido Key', icon: 'fa fa-usb'}, { name: 'Fido FP', icon: 'fa fa-microchip'}];
        return(
        <Card className="keys">
            <CardHeader>Hardware Devices
            <div className="card-header-actions">
                <Locking onAuth={onAuth} auth={auth}/>
            </div>
            </CardHeader>
            <CardBody>
                <div className="keysbtn"> 
                    {/* <Button color="primary" className="add" onClick={toggle} disabled={auth?false:true}>Add Nkn Addr for login</Button> */}
                   
                    {
                        keys.map((v, i) => (
                            <Card className="text-white bg-primary text-center" key={i}>
                                <CardBody>
                                    <p key={i}><i className={classnames(v.icon)}></i>{v.name}<i className="cui-check icons"></i></p>
                                </CardBody>
                            </Card>
                        ))
                    }
                    <Button color="primary" className="add" onClick={toggle} disabled={auth?false:true}>+</Button>
                    {/* <i className="fa fa-plus"></i> */}
                </div>
                {this.modalBindNkn()}
            </CardBody>
        </Card>
        )   
    }
}

// {
//     wallets.filter(v => v.tags.length !== 0 && v.tags[0] === 'LOGIN_CODE').map((v,idx)=>{
//         return(
//         <div key={idx} style={{display: 'flex',alignItems: 'center',marginBottom:'.5rem',justifyContent:'space-between'}}>
//             <Input defaultValue={v.info.publicKey} type="text" disabled style={{width:'97%'}}/> 
//             <span>{v.tags[0]}</span>
//             {/* <i className="fa fa-close"></i> */}
//         </div>
//         )
//     })
// }
