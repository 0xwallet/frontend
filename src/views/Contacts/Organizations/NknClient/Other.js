import React from 'react';

// Example of nkn-client-js for Node.js
// Usage: node node_example.js seedRpcServerAddr timeoutInMilliSeconds

import nkn from 'nkn-client';

// Never put private key in version control system like here!
const seed = localStorage.getItem('token').slice(0,64);
const seedRpcServerAddr = process.argv[2];
const logPrefix = process.argv[4] ? ('[' + process.argv[4] + '] ') : '';
function generateMessage() {
  let fromClient = nkn({
    // neither of these are required, as shown in toClient below
    identifier: 'lcj',
    seed: seed,
    seedRpcServerAddr: seedRpcServerAddr,
  });

  console.log(fromClient.key.seed, fromClient.key.privateKey, fromClient.key.publicKey);

  fromClient.on('connect', () => {
    try {
      fromClient.send('jerry.b20b8383834fbf0bf70b7cb28d120f2566ccc2167ee8246ea9e4db6fffac2d3c','nihaohehehshijie')
    } catch (e) {
      console.error(logPrefix + e);
    }
  });
}

generateMessage();
