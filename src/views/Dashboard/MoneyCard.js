import React, {useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardBody, ButtonGroup, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import WalletModal from './WalletModal';

export default (props)=> {
    const { chartData, chartOpts, id, isOpen, balance } = props;
    const [open, setOpen] = useState(isOpen);
    const [actionName, setActionName] = useState('');
    const [walletType, setWalletType] = useState(0);
    const [modalVisible, setVisible] = useState(false);

    const icons = {
        0 : 'fa fa-bitcoin',
        1 : 'fa fa-dollar',
        2 : 'fa fa-yen',
        3 : 'fa fa-code'
    }

    const names = {
      0 : 'text-white bg-warning',
      1 : 'text-white bg-info',
      2 : 'text-white bg-danger',
      3 : 'text-white bg-success'
    }
    const toggle = () => setOpen(!open);
    const actions = ['deposit', 'withdrawal', 'transfer'];
    const handleAction = (actionName, walletType) => {
      setActionName(actionName);
      setWalletType(walletType);
      // openModal
      setVisible(true)
    }

    const Props = {
      open: modalVisible,
      toggle: () => setVisible(false),
      actionName,
      walletType,
    }

    console.log(Props, 'ss');

    return(
      <Card className={names[id]} >
        <CardBody className="pb-0">
          <ButtonGroup className="float-right">
            <ButtonDropdown id={id} isOpen={open} toggle={toggle}>
              <DropdownToggle caret className="p-0" color="transparent">
                <i className="fa fa-qrcode"></i>
              </DropdownToggle>
              <DropdownMenu right>
                {
                  actions.map(v => <DropdownItem key={v} onClick={(e) => handleAction(v, id)}>{v}</DropdownItem>)
                }
              </DropdownMenu>
            </ButtonDropdown>
          </ButtonGroup>
          {/* fa fa-bitcoin */}
          <div className="text-value"><i className={icons[id]}></i>{ balance }</div>
          
          {/* <div>{ format(cardNumber) }</div> */}
        </CardBody>
        <div className="chart-wrapper mt-3 mx-3" style={{ height: '70px' }}>
          <Bar data={chartData} options={chartOpts} height={70} />
        </div>
        <WalletModal {...Props} />
      </Card> 
    )
}

// function format(str){
//   const str1 = str.substring(0,4);
//   const str2 = str.substring(4,8);
//   const str3 = str.substring(8,12);
//   const str4 = str.substring(12,16);
//   return str1 + ' ' + str2 + ' ' + str3 + ' ' + str4
// }