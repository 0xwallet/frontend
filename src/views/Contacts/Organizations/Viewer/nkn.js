// Example of nkn-client-js for Node.js
// Usage: node node_example.js seedRpcServerAddr timeoutInMilliSeconds

const crypto = require('crypto');
const nkn = require('nkn-client');

// Never put private key in version control system like here!
const seed = '2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0';
// const seedRpcServerAddr = process.argv[2];
// const logPrefix = process.argv[4] ? ('[' + process.argv[4] + '] ') : '';
// console.log(seedRpcServerAddr)

function generateMessage() {
  let fromClient = nkn({
    // neither of these are required, as shown in toClient below
    identifier: 'lcj',
    seed: seed,
    seedRpcServerAddr: 'http://mainnet-seed-0001.nkn.org:30003',
  });

  console.log('1');

  let toClient = nkn({
    identifier: 'toclient',
    seed: seed,
    seedRpcServerAddr: 'http://mainnet-seed-0001.nkn.org:30003',
  });

  console.log('2');

  fromClient.on('connect', () => {
    try {
      fromClient.send(toClient.addr,'nihaoshijie');
      console.log('3');
    } catch (e) {
      console.error(e);
    }
  });

  toClient.on('connect', () => {
    console.log('4');
    try {
        toClient.on('message',(src,payload,payloadType)=>{
        console.log(src,payload,payloadType,'hello world hello world')
      })
    } catch (e) {
      console.error( e);
    }
  });
}

export { generateMessage }
