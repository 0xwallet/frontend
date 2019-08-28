import React,{PureComponent}from 'react';
import { Card, CardBody, CardHeader ,Row,Col,ButtonGroup,Dropdown,DropdownToggle,DropdownMenu,DropdownItem, Button } from 'reactstrap';
import Widget04 from './Widget04';
import CreateOrgModal from './CreateOrgModal';
// import {generateMessage} from './nkn';

class Viewer extends PureComponent{
    constructor(){
        super();
        this.orgref = React.createRef();
    }
    state = {
        card4 : true,
        card3 : true,
        card2 : true,
        card1 : true,
        orgisopen : false,
        orgname: 'My organizations',
        orglist : ['0waf','github','bsvorg']
    }
    selorg=(_e,v)=>{
       this.setState({
           orgname: v
       })
    }
    openisOrg=()=>{
        this.orgref.current.toggle();
    }
    render(){
        // const { places } = this.props.data;
        return(
            <Card>
                <CardHeader style={{display: 'flex',alignItems: 'center'}}>    
                <ButtonGroup >
                  <Dropdown id='org' isOpen={this.state.orgisopen} toggle={() => { this.setState({ orgisopen: !this.state.orgisopen }); }}>
                    <DropdownToggle caret className="p-0" color="#000">
                    <i className="icon-equalizer"></i>{'  '}
                     {this.state.orgname}{' '} 
                    </DropdownToggle>
                    <DropdownMenu left="true">
                      {/* {
                          places.map((v,i)=>{
                              return(
                                <DropdownItem onClick={(e)=>{
                                    this.selorg(e,v.name)
                                }} key={i}>{v.name}</DropdownItem> 
                              )
                          })
                      } */}
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <span style={{color:'#20a8d8',marginLeft:'1rem',cursor:'pointer'}} onClick={this.openisOrg}>create</span>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12" sm="6" lg="3">  
                            <Widget04 icon="fa fa-laptop" color="info" header="99999.99" value="50" id="income">Income</Widget04>
                        </Col>
                        <Col xs={12} sm={6} md={3} >
                             <Widget04 icon="fa fa-podcast" color="info" header="33333" value="25" id="channels">Users</Widget04>                           
                         </Col>
                         <Col xs="12" sm="6" lg="3">
                             <Widget04 icon="icon-people" color="info" header="55555" value="25" id="org">Members</Widget04>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <Widget04 icon="icon-pie-chart" color="info" header="87.500" value="25" id="all">Statistics</Widget04>
                        </Col>
                    </Row>
                </CardBody>
                <CreateOrgModal ref={this.orgref}/>
            </Card>
        )
    }
}

// const fromClient = nkn({
//     identifier: "fromClient",
//     // seedRpcServerAddr: 'http://mainnet-seed-0001.nkn.org:30003/',
//     seedRpcServerAddr: 'http://localhost:8080/nkn',
// })

// let toClient = nkn({
//     identifier: 'toclient',
//     seedRpcServerAddr: 'http://localhost:8080/nkn',
// });

// function testnkn(){
//     fromClient.on('connect', () => {
//         try {
//           fromClient.send(toClient.addr,'nihaoshijie');
//           console.log('3');
//         } catch (e) {
//           console.error(e);
//         }
//     });
//     testnkn1()
// }

// function testnkn1(){
//     toClient.on('connect', () => {
//         console.log('4');
//         try {
//             toClient.on('message',(src,payload,payloadType)=>{
//             console.log(src,payload,payloadType,'hello world hello world')
//           })
//         } catch (e) {
//           console.error( e);
//         }
//     });
// }

function ViewerMutation(){
    return(
        <div>
            hello nkn-client;
            <Button onClick={null}>send msg</Button>
        </div>
    )
}


export default ViewerMutation;