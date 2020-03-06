import React, { useState } from 'react';
import { 
  Card, CardBody, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  ModalBody, ModalFooter, ModalHeader, Modal, Input
} from 'reactstrap';
import gql from "graphql-tag";
import propTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { Tooltip, Icon, message } from 'antd';
import client from '../../../../../client';
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

function copyUrl2(address) {
  const oInput = document.createElement('input');
  oInput.value = address;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
  oInput.className = 'oInput';
  oInput.style.display='none';
  message.success('copy success');
}

function ModalImport({ importOpen, setImportOpen, actionItem, email, username, setAddr }) {
  console.log(username);
  const [seedImport, setSeedImport] = useState('');
  const [seedPass, setImportPass] = useState('');
  const closeToggle = () => setImportOpen(false);
  const handleImport = () => {
    client.mutate({
        mutation: bindNknAddr,
        variables: { nknAddress: seedImport}
    }).then(res => {
        client.mutate({
            mutation: setDefaultNknAddr,
            variables: { password: seedPass, walletId: res.data.bindNknAddress.id, tag: "MESSAGE" }
        }).then((res) => {
          const { identifier, publicKey } = res.data.setDefaultNknAddress.info;
          const nknAddress = `${identifier}.${publicKey}`;
          setAddr(nknAddress);
          message.success('mutation success');
        })
    });
    closeToggle();
  }
  const { seedUseRestore } = JSON.parse(localStorage.getItem(email)) || { seedUseRestore: '' };
  const Body = (actionItem) => {
    if (actionItem === 'Show Secret Seed') {
      return <span>{seedUseRestore}</span>;
    }
    if (actionItem === 'Import Wallet') {
      return (
        <>
          <Input onChange={(e) => setSeedImport(e.target.value)} placeholder="please input nkn addr like username.xxx" />
          <Input 
            onChange={(e) => setImportPass(e.target.value)} placeholder="please input password" 
            type="password"
            style={{
              marginTop: '5px'
            }}
          />
        </>
      );
    }
    return <span>Export Wallet</span>
  }
  return (
    <Modal isOpen={importOpen} toggle={closeToggle}>
      <ModalHeader toggle={closeToggle}>{actionItem}</ModalHeader>
      <ModalBody>
        <Body />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleImport}>Ok</Button>{' '}
        <Button color="secondary" onClick={closeToggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

ModalImport.propTypes = {
  importOpen: propTypes.bool.isRequired,
  setImportOpen: propTypes.func.isRequired,
  setAddr: propTypes.func.isRequired,
  actionItem: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
}

function CodeQr({ open, closeToggle }) {
  return (
    <Modal isOpen={open} toggle={closeToggle} style={{ width: '250px' }}>
      <ModalHeader toggle={closeToggle}>Scan</ModalHeader>
      <ModalBody>
        <QRCode
          value={'https://nmobile.nkn.org/downloads'}  //value参数为生成二维码的链接
          size={200} //二维码的宽高尺寸
          fgColor="#000000"  //二维码的颜色
        />
      </ModalBody>
    </Modal>
  );
}

CodeQr.propTypes = {
  open: propTypes.bool.isRequired,
  closeToggle: propTypes.func.isRequired,
}

function Addr(props) {
  const { address, email, username, auth, onAuth } = props;
  const [open, setOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [qropen, setQropen] = useState(false);

  const [actionItem, setActionItem] = useState('show seed');
  const [addr, setAddr] = useState(address);
  const actions = ['Export Wallet', 'Import Wallet', 'Show Secret Seed'];

  const handleActions = (actionItem) => {
    setImportOpen(true);
    setActionItem(actionItem)
  }

  const toggle = () => setQropen(false);

  const Props = {
    importOpen,
    setImportOpen,
    actionItem,
    email,
    username,
    setAddr
  }

  return (
    <div style={{ paddingTop: '20px', borderBottom: '1px solid #c8ced3' }}>
      <CodeQr closeToggle={toggle} open={qropen} />
      <div style={{ marginBottom: '8px' }}>
        <Tooltip title="Serverless chat for public and permissioned groups, secure and private 1-on-1 chat, as well as communicate with machines."><i className="fa fa-info"></i></Tooltip>
        <span style={{ marginLeft: '5px' }}>How <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setQropen(true)}>D-Chat</span> works</span>
      </div>
      <Card className="text-white bg-primary">
        <CardBody>
          <blockquote className="card-bodyquote" style={{ position: 'relative' }}>
            <p>
              <Tooltip title={addr}>{addr.slice(0, 60)}...</Tooltip>
              <Icon type="copy" style={{ marginLeft: '5px' }} onClick={() => copyUrl2(address)} />
            </p>
            <footer>
              <span> 
                <i className="cui-check icons font-xl" style={{ color: '#4dbd74' }}></i> 
              </span>
              <span style={{ color: "#2f353a", marginRight: '8px' }}>Primary</span>
              <cite title="Source Title">NKN Pubkey Address</cite>
            </footer>
            <Button color="light" outline className="btn-pill" style={{ padding: '0 10px', marginTop: '15px' }}>Share</Button>
            <i className="fa fa-qrcode font-2xl" style={{ position: "absolute", top: 0, right: 0 }}></i>
            {
              auth && (
                <Dropdown isOpen={open} toggle={() => setOpen(!open)} style={{ position: 'absolute', right: 0, bottom: 0 }}>
                  <DropdownToggle style={{ background: '#20a8d8', border: 'none'}}>
                    <i className="cui-options icons font-2xl mt-4"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    {
                      actions.map((v, i) => (
                        <DropdownItem key={i} onClick={() => handleActions(v)}>{v}</DropdownItem>
                      ))
                    }
                  </DropdownMenu>
                </Dropdown>
              )}
          </blockquote>
          <ModalImport {...Props} />
        </CardBody>
      </Card>
    </div>
  );
}

Addr.propTypes = {
  address: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  auth: propTypes.bool.isRequired,
  onAuth: propTypes.func.isRequired,
}

export default Addr;
