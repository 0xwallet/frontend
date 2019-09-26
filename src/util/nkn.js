const nkn = require('nkn-client');

// Never put private key in version control system like here!
const seed = '2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0';
const seed2 = '2bc5801d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb3';
const seedRpcServerAddr = process.argv[2];

function generateMessage(msg) {
  let fromClient = nkn({
    // neither of these are required, as shown in toClient below
    identifier: 'lcj',
    seed: seed,
    seedRpcServerAddr: seedRpcServerAddr,
  });
  console.log('start')
  let toClient = nkn({
    identifier: 'toclient',
    seed: seed2,
    seedRpcServerAddr: seedRpcServerAddr,
  });

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
        if(localStorage.getItem('receiveArr')){
          // console.log('have');
          // const receiveArr = JSON.parse(localStorage.getItem('receiveArr'));
          // console.log(receiveArr,'receive')
          // receiveArr.push({
          //   id: Date.now(),
          //   detail: payload
          // })
          // localStorage.setItem('receiveArr',JSON.stringify(receiveArr));
        }
        if(!localStorage.getItem('receiveArr')){
          // console.log('no have');
          // const receiveArr = [];
          // receiveArr.push({
          //   id: Date.now(),
          //   detail: payload
          // })
          // localStorage.setItem('receiveArr',JSON.stringify(receiveArr));
        }
      })
    } catch (e) {
      console.error( e);
    }
  });
}

export default generateMessage
