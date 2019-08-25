import React,{PureComponent}from 'react';
import { Card, CardBody, CardHeader ,Row,Col,ButtonGroup,Dropdown,DropdownToggle,DropdownMenu,DropdownItem, Button } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Widget04 from './Widget04';
import CreateOrgModal from './CreateOrgModal';
import nkn from 'nkn-client';
const seed = '2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0';
const seed2 = '9bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0';

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
        const { places } = this.props.data;
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
                      {
                          places.map((v,i)=>{
                              return(
                                <DropdownItem onClick={(e)=>{
                                    this.selorg(e,v.name)
                                }} key={i}>{v.name}</DropdownItem> 
                              )
                          })
                      }
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



function testnkn(){
    let fromClient = nkn({
        // neither of these are required, as shown in toClient below
        identifier: 'fromClient',
        seed,
        seedRpcServerAddr: 'http://localhost:8888/nkn',
        // seedRpcServerAddr: 'http://mainnet-seed-0001.nkn.org:30003',
    });

    let toClient = nkn({
        // neither of these are required, as shown in toClient below
        identifier: 'toClient',
        seed: seed2,
        seedRpcServerAddr: 'http://localhost:8888/nkn',
    });
    console.log('client init',toClient.addr)
    
    fromClient.on('connect', () => {
        try {
          fromClient.send(
              'toClient.97b93f48148cbe3af620ef79d3e67e95e1bbd53b965ecd0a596a89ceccf5094e',
              'nihao i am fromsfsdfclient');
          console.log('3');
        } catch (e) {
          console.error(e);
        }
    });
    
    toClient.on('connect', () => {
        console.log('hello world toclient');
        try {
            toClient.on('message',(src,payload,payloadType)=>{
            console.log(src,payload,payloadType,'hello world hello world')
          }) 
        } catch (e) {
          console.error( e);
        }
    });
}


function ViewerMutation(){
    return(
        <div>
            hello nkn-client;
            <Button onClick={generateMessage}>send msg</Button>
        </div>
    )
}

// Never put private key in version control system like here!
// const seed = '2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0';
const seedRpcServerAddr = process.argv[2];
const timeout = parseInt(process.argv[3]) || 5000;
const logPrefix = process.argv[4] ? ('[' + process.argv[4] + '] ') : '';
var timeSent, timeReceived;

function generateMessage() {
  let fromClient = nkn({
    // neither of these are required, as shown in toClient below
    identifier: 'fromclient',
    seed: seed,
    // seedRpcServerAddr: seedRpcServerAddr,
    seedRpcServerAddr: 'http://localhost:8888/nkn',
  });
  console.log('start')
  fromClient.on('connect', () => {
    try {
      let toClient = nkn({
        identifier: 'toclient',
        seedRpcServerAddr: 'http://localhost:8888/nkn',
      });
      toClient.on('connect', () => {
        try {
          fromClient.send(
            toClient.addr,
            'Hello world! new test',
            // For byte array:
            // Uint8Array.from([1,2,3,4,5]),
          ).then((data) => {
            timeReceived = new Date();
            console.log(logPrefix + 'Receive', '"' + data + '"', 'from', toClient.addr, 'after', timeReceived - timeSent, 'ms');
          }).catch((e) => {
            console.log(logPrefix + 'Catch: ', e);
          });
          timeSent = new Date();
          console.log(logPrefix + 'Send message from', fromClient.addr, 'to', toClient.addr);
          setTimeout(function () {
            try {
              toClient.close();
              if (timeReceived === undefined) {
                console.log(logPrefix + 'Message from', fromClient.nodeAddr, 'to', toClient.nodeAddr, 'timeout');
              }
            } catch (e) {
              console.error(logPrefix + e);
            }
          }, timeout);
        } catch (e) {
          console.error(logPrefix + e);
        }
      });
      // can also be async (src, payload, payloadType) => {}
      toClient.on('message', (src, payload, payloadType, encrypt) => {
        timeReceived = new Date();
        var type;
        if (payloadType === nkn.PayloadType.TEXT) {
          type = 'text';
        } else if (payloadType === nkn.PayloadType.BINARY) {
          type = 'binary';
        }
        console.log(logPrefix + 'Receive', encrypt ? 'encrypted' : 'unencrypted', type, 'message', '"' + payload + '"','from', src, 'after', timeReceived - timeSent, 'ms');
        // Send a text response
        return 'Well received!';
        // For byte array response:
        // return Uint8Array.from([1,2,3,4,5])
      });
      setTimeout(function () {
        try {
          fromClient.close();
        } catch (e) {
          console.error(logPrefix + e);
        }
      }, timeout);
    } catch (e) {
      console.error(logPrefix + e);
    }
  });
}


export default ViewerMutation;