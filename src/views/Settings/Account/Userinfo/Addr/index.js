import React, { useState } from 'react';
import { 
  Card, CardBody, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  ModalBody, ModalFooter, ModalHeader, Modal, Input,
} from 'reactstrap';
import propTypes from 'prop-types';
import { Tooltip, Icon, message } from 'antd';
import "antd/dist/antd.css";

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

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

function ModalImport({ importOpen, setImportOpen }) {
  const closeToggle = () => setImportOpen(false);
  return (
    <Modal isOpen={importOpen} toggle={closeToggle}>
      <ModalHeader toggle={closeToggle}>Import seed</ModalHeader>
      <ModalBody>
        <Input />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={closeToggle}>Ok</Button>{' '}
        <Button color="secondary" onClick={closeToggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

function Addr(props) {
  const { address } = props;
  const [open, setOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const actions = ['show seed', 'import seed'];

  const handleActions = (actionItem) => {
    if (actionItem === 'import seed') {
      setImportOpen(true);
    }
  }

  const Props = {
    importOpen,
    setImportOpen
  }

  return (
    <div style={{ paddingTop: '20px', borderBottom: '1px solid #c8ced3' }}>
        {/* <Col> */}
          <Card className="text-white bg-primary">
            <CardBody>
              <blockquote className="card-bodyquote" style={{ position: 'relative' }}>
                <p>
                  <Tooltip title={address}>{address.slice(0, 60)}...</Tooltip>
                  <Icon type="copy" style={{ marginLeft: '5px' }} onClick={() => copyUrl2(address)} />
                </p>
                <footer>
                  <span> 
                    <i className="cui-check icons font-xl" style={{ color: '#4dbd74' }}></i> 
                  </span>
                  <span style={{ color: "#2f353a", marginRight: '8px' }}>Primary</span>
                  <cite title="Source Title">NKN Pubkey Address</cite>
                </footer>
                <Button color="light" outline className="btn-pill" style={{ padding: '0 10px', marginTop: '5px' }}>Share</Button>
                <i className="fa fa-qrcode font-2xl" style={{ position: "absolute", top: 0, right: 0 }}></i>
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
              </blockquote>
              <ModalImport {...Props} />
            </CardBody>
          </Card>
        {/* </Col> */}
    </div>
  );
}

Addr.propTypes = {
  address: propTypes.string.isRequired,
}

export default Addr;
