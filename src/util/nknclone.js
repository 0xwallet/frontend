const nkn = require('nkn-client');

// Never put private key in version control system like here!
const seed = '2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0';
const seed2 = '2bc5801d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0';

let fromClient = nkn({
    // neither of these are required, as shown in toClient below
    identifier: 'lcj',
    seed: seed,
    seedRpcServerAddr: 'http://localhost:8080/nkn',
  });
let toClient = nkn({
    identifier: 'toclient',
    seed: seed2,
    seedRpcServerAddr: 'http://localhost:8080/nkn',
});

function generateMessage(msg) {
  console.log('start',msg)
  fromClient.on('connect', () => {
    try {
      fromClient.send(toClient.addr,msg);
      console.log('3');
    } catch (e) {
      console.error(e);
    }
  });
  toClient.on('connect', () => {
    console.log('connect')
    try {
        toClient.on('message',(src,payload,payloadType)=>{
        console.log(src,payload,payloadType,'receive ack');
      })
    } catch (e) {
      console.error( e);
    }
});
}

export default generateMessage
