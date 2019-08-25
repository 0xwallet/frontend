import React,{useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardBody, ButtonGroup, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

export default (props)=> {
    const { chartData, chartOpts, id, isOpen, cardNumber, balance } = props;

    const [open,setOpen] = useState(isOpen);

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

    return(
         <Card className={names[id]} >
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id={id} isOpen={open} toggle={() => setOpen(!open)}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="fa fa-qrcode"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
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