import React from 'react';
import {
  Modal, 
  ModalBody,ModalFooter,Button,FormGroup,Label,Input,Col, Row, ModalHeader,
  FormText, InputGroup, InputGroupAddon, InputGroupText , Form
} from 'reactstrap';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';

class WalletModal extends React.Component{
    constructor(props) {
      super(props);
    }
   
    render_withdrawal_input() {
      return (
        <>
          <FormGroup>
            {/* <Label>Withdrawal Numbers</Label> */}
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText><i className="fa fa-usd"></i></InputGroupText>
              </InputGroupAddon>
              <TextMask
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                Component={InputAdapter}
                className="form-control"
              />
            </InputGroup>
            <FormText color="muted">
              max. 999999999
            </FormText>
          </FormGroup>
          <Button color="info">confirm</Button>
        </>
      );
    }

    render_deposit() {
      const imgURl = './code.png';
      return (
        <>
          <h2>your deposit address</h2>
          <img src={imgURl} alt="qr code" style={{ height: '150px', width: '150px'}}/>
          <h5>sssssssssssssssssssssssssssssssssssssss</h5>
          <Button color="info">copy address</Button>
        </>
      );
    }

    render_withdrawal() {
      return (
        <>
          <FormGroup style={{ width: '100%' }}>
            <Label htmlFor="email-input">Withdrawal Address</Label>
            <Input type="email" id="email-input" name="email-input" placeholder="Withdrawal Address" autoComplete="email"/>
            <FormText className="help-block">Please enter your withdrawal address</FormText>
          </FormGroup>
          <FormGroup style={{ width: '100%' }}>
            <Label htmlFor="password-input">Withdrawal Amount</Label>
            <Input type="password" id="password-input" name="password-input" placeholder="Withdrawal Amount" autoComplete="new-password" />
            <FormText className="help-block">Please enter a withdrawal amount</FormText>
          </FormGroup>
          <Button color="info" style={{ width: '100%' }}>confirm Withdrawal</Button>
        </>
      );
    }

    render_transfer() {
      return (
        <>
            <FormGroup style={{ width: '100%' }}>
                <Label htmlFor="token">Coin/Token</Label>
                <Input type="text" id="token" placeholder="Enter your coin or token" required />
            </FormGroup>

            <FormGroup style={{ width: '100%' }}>
                <Label htmlFor="from">Form</Label>
                <Input type="text" id="from" placeholder="个人账户/组织账户" required />
            </FormGroup>
            <FormGroup style={{ width: '100%' }}>
                <Label htmlFor="to">To</Label>
                <Input type="text" id="to" name="to" placeholder="组织账户/个人账户" />
                {/* <FormText className="help-block">Please enter your withdrawal address</FormText> */}
            </FormGroup>
            <FormGroup style={{ width: '100%' }}>
                <Label htmlFor="Amount">Amount</Label>
                <Input type="password" id="Amount" name="Amount" placeholder="Amount" />
                <FormText className="help-block">Available 0 BSV transfer ALL</FormText>
            </FormGroup>
            <Button color="info" style={{ width: '100%' }}>confirm</Button>
        </>
      );
    }

    render_income() {
      const { actionName } = this.props;
      return (
        <div style={{ minHeight: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}>

          {/* <Progress className="progress-xs" color="info" value="25" style={{width: '100%'}} /> */}
          {actionName === 'deposit' && this.render_deposit()}
          {actionName === 'withdrawal' && this.render_withdrawal()}
          {actionName === 'transfer' && this.render_transfer()}
        </div>
      );
    }

    render(){
      const { open, toggle, actionName } = this.props; 
      return (
        <Modal isOpen={open} toggle={toggle}>
          <ModalHeader toggle={toggle}>{actionName}</ModalHeader>
          <ModalBody>
            <Form action="" method="post" encType="multipart/form-data" style={{ width: '100%' }}>
                {this.render_income()}
            </Form>
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={toggle}>Ok</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
      );
    }
}

export default WalletModal;
