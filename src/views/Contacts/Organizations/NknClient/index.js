import React from 'react';
// import nknClient from 'nkn-client';
// import Other from './Other';

// const seed = localStorage.getItem('token').slice(0,64);
// const seedRpcServerAddr = process.argv[2];
// const logPrefix = process.argv[4] ? ('[' + process.argv[4] + '] ') : '';


// function generateMessage() {
//   let jerryClient = nknClient({
//     // neither of these are required, as shown in toClient below
//     identifier: 'jerry',
//     seed: seed,
//     seedRpcServerAddr: seedRpcServerAddr,
//   });

//   console.log(jerryClient.key.seed, jerryClient.key.privateKey, jerryClient.key.publicKey);

//   jerryClient.on('connect', () => {
//     try {
//         jerryClient.on('message',(src,payload,payloadType)=>{
//         console.log(src,payload,payloadType)
//       })
//     } catch (e) {
//       console.error(logPrefix + e);
//     }
//   });
// }

// generateMessage();




export default class NknClient extends React.PureComponent{

    render(){
        return(
            <div>
                hello nknClient
                {/* <Other/> */}
            </div>
        )
    }
}