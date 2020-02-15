import React, { useState } from 'react';
import { Row, Col , FormGroup, Label, Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Query, Mutation, graphql } from 'react-apollo';
import { Tooltip } from 'antd';
import gql from 'graphql-tag'; 
import "antd/dist/antd.css";

import './index.scss';

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
            }
        }
    }
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
    setDefaultNknAddress(password: $password, walletId: $walletId, tag: LOGIN_CODE){
      info{
        address,
        identifier,
        publicKey
      }
    }
}
`;

function Dogs(props) {
    const [ password, setPassword ] = useState({});
    const [ passwordInput, setInput ] = useState('');
    const [ walletId, setWalletId ] = useState('');
    const [ isOpen, setOpen ] = useState(false);
    const [ modalPassword, setModalPassword ] = useState('');
    const [ modalWalletId, setModalWalletId ] = useState('');
    const [ nknAddress, setNknAddr ] = useState('');

    const handleNknAddr = (e) => setNknAddr(e.target.value);

    const handleModalpassword = (e) => setModalPassword(e.target.value);
    const handleCompleted = (data) => {
        setModalWalletId(data.bindNknAddress.id);
    }
    const handleSetDefault = (e, id) => {
        const cache = {...password, [id]: true};
        setPassword(cache);
        setWalletId(id);
    };
    const handleInput = (e) => setInput(e.target.value);
    const handleSetSendCode = (e, setdefault) => {
        if (e.keyCode === 13) {
            setdefault();
        }
    };
    const active = (bind, setdefault) => {
        // props.addJob(params);
        bind().then((res) => {
            const walletId = res.data.bindNknAddress.id;
            const params = {
                password: modalPassword,
                walletId: walletId,
            };
            props.addJob(params).then(() => setOpen(false));
            // setWalletId(walletId);
            // console.log(params, 'params', walletId)
            // setdefault(params).then(() => {
            //     setOpen(false);
            // })
        });
    }

    const params = {
        password: modalPassword,
        walletId: modalWalletId,
    };

    return (
            <div className="detail">
                <header className="title">Public info</header>
                <Query query={LAUNCHES_QUERY}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return 'Loading...';
                            if (error) return `Error! ${error.message}`;
                            const { username, email, wallets } = data.me;
                            const newtree = {
                                username,
                                email,
                            }
                            return (
                                <>
                                    {
                                       Object.keys(newtree).map((v,i) => (
                                            <Row key={i}>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor={v}>{v}</Label>
                                                        <Input type="text" id={v}
                                                        disabled
                                                        // disabled={!auth}
                                                        defaultValue={newtree[v]}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        ))  
                                    }
                                    {
                                       (
                                            <Mutation mutation={bindNknAddr} variables={{ nknAddress }} onCompleted={handleCompleted}>
                                                {
                                                    (bind, { loading, error }) => {
                                                        if (loading) return 'loading';
                                                        if (error) return 'error';
                                                        // return (
                                                        //     <>
                                                        //         <Input type="text" placeholder="please input your nkn addr" onChange={handleNknAddr} key="modalinput" />
                                                        //         {/* <Button color="info" size="sm" onClick={bind}>ok</Button> */}
                                                        //     </>
                                                        // );
                                                        return (
                                                            <Mutation mutation={setDefaultNknAddr} variables={params}>
                                                                {
                                                                    (setdefault, { loading, error }) => {
                                                                        if (loading) return 'loading';
                                                                        if (error) return 'error';
                                                                        return (
                                                                            <>
                                                                                <span className="webauthn" onClick={() => setOpen(true)}>Activate Nkn password free login</span>
                                                                                <Modal isOpen={isOpen} toggle={() => setOpen(false)}>
                                                                                    <ModalBody>
                                                                                        <Input type="text" placeholder="please input your nkn addr" onChange={handleNknAddr} />
                                                                                        <Input type="text" placeholder="please input your code" onChange={handleModalpassword} />
                                                                                    </ModalBody>
                                                                                    <ModalFooter>
                                                                                        <Button color="primary" onClick={() => active(bind, setdefault)}>active</Button>
                                                                                        <Button color="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                                                                                    </ModalFooter>
                                                                                </Modal>
                                                                            </>
                                                                        );
                                                                    }
                                                                }
                                                            </Mutation>
                                                        ); 
                                                    }
                                                }
                                            </Mutation>
                                        )
                                    }
                                    {/* {
                                         <Mutation mutation={setDefaultNknAddr} variables={params}>
                                            {
                                                (setdefault, { loading, error }) => {
                                                    if (loading) return 'loading';
                                                    if (error) return 'error';
                                                    return (
                                                        <>
                                                            <Input type="password" placeholder="please input your password" onChange={handleModalpassword} key="madalpass"/>
                                                            <Button color="info" size="sm" onClick={setdefault}>ok</Button>
                                                        </>
                                                       
                                                    );
                                                }
                                            }
                                        </Mutation>
                                    } */}
                                    {
                                        wallets && wallets.map((v) => (
                                            <React.Fragment key={v.id}>
                                                <Row>
                                                    <Col xs="12">
                                                        <Tooltip title={v.info.publicKey} style={{ width: "100px"}}>
                                                            {v.info.publicKey.slice(0, 16)}...
                                                        </Tooltip>
                                                        <Mutation
                                                            mutation={bindNknAddr}
                                                            variables={{
                                                                nknAddress: `${v.info.identifier}.${v.info.publicKey}`,
                                                            }}
                                                        >
                                                            {
                                                                (bind, { loading, error }) => {
                                                                    if (loading) {
                                                                        return (
                                                                            <Button 
                                                                                color="info" 
                                                                                size="sm" 
                                                                                style={{ marginLeft: '5px' }}
                                                                            >
                                                                                loading
                                                                            </Button>
                                                                        );
                                                                    }
                                                                
                                                                    if (error) return 'ERROR';
                                                                    return (
                                                                        <Button 
                                                                            color="info" 
                                                                            size="sm" 
                                                                            style={{ marginLeft: '5px' }}
                                                                            onClick={bind}
                                                                        >
                                                                            bind
                                                                        </Button>
                                                                    );
                                                                }
                                                            }
                                                        </Mutation>
                                                        <Button 
                                                            color="primary" 
                                                            size="sm" 
                                                            style={{ marginLeft: '5px' }}
                                                            onClick={(e) => handleSetDefault(e, v.id)}
                                                        >
                                                            default
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                {
                                                    password[v.id] && (
                                                        <Mutation 
                                                            mutation={setDefaultNknAddr} 
                                                            variables={{
                                                                password: passwordInput,
                                                                walletId,
                                                            }}
                                                        >
                                                            {
                                                                (setdefault, { loading, error }) => {
                                                                    if (loading) return 'loading';
                                                                    if (error) return 'error';
                                                                    return (
                                                                        <Row>
                                                                            <Col xs="12">
                                                                                <Input onChange={handleInput} onKeyDown={(e) => handleSetSendCode(e, setdefault)} type="password" placeholder="please input your password" autoComplete="off"></Input>
                                                                            </Col>
                                                                        </Row>
                                                                    );
                                                                }
                                                            }
                                                        </Mutation>
                                                    )
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </>
                            );
                        }
                    }
                </Query>
                {/* <header className="title">Non-public info</header>
                {
                    Object.keys(newtreeprivate).map((v,i)=>{
                        return(
                            <Row key={i}>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor={v}>{v}</Label>
                                        <Input type="text" id={v} placeholder="Enter your userName" required
                                        disabled={!auth}
                                        defaultValue={newtreeprivate[v]}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        )
                    })
                } */}
            </div>
  )
}

const newJobOperation = graphql(setDefaultNknAddr, {
    props: ({ mutate }) => ({   //mutate为自带参数
        addJob: factor => mutate({  //自定义addJob并接受从视图页传来的factor,在视图也可直接使用this.props.addJob(args)来调用该方法
        variables: factor,  //修改参数
        }),
    }),
})(Dogs);

export default newJobOperation;

// export default compose(graphql(bindNknAddr, { name: 'bindNknAddr' }), graphql(setDefaultNknAddr, { name: 'setDefaultNknAddr' }))(Dogs);