// import React,{ PureComponent } from 'react';
// import { Input } from 'reactstrap';
// import nkn from 'nkn-multiclient';
// import rpcCall from 'nkn-client/lib/rpc';
// import nknWallet from 'nkn-wallet';
// import { createStore } from 'redux';
// import './index.scss';
// const msgarr = [];
// function counter(state = msgarr, action) {
//   switch (action.type) {
//   case 'INCREMENT':
//     return [...state, action.payload];
//   default:
//     return state;
//   }
// }

// let store = createStore(counter);

// // const token = localStorage.getItem('auth-token');
// // const seedarr = token.split('.');
// // const seed = seedarr[0].substr(0,6) + seedarr[1];
// // const wallet = nknWallet.restoreWalletBySeed(seed, seedarr[2]);
// const wallet = nknWallet.newWallet('passwordhttps://mainnet-rpc-node-0001.nkn.org/mainnet/api/wallet');

// nknWallet.configure({
//     // rpcAddr: 'https://owaf.io',
//     rpcAddr: 'https://mainnet-rpc-node-0001.nkn.org/mainnet/api/wallet',
// });

// const client = nkn({
//     originalClient: true,
//     identifier: localStorage.getItem('username'),
//     seed: wallet.getSeed(),
//     seedRpcServerAddr: 'https://mainnet-rpc-node-0001.nkn.org/mainnet/api/wallet',
//     msgHoldingSeconds: 3999999999,
// });

// const latestBlockHeight = rpcCall(
//     // 'https://owaf.io',
//     'https://mainnet-rpc-node-0001.nkn.org/mainnet/api/wallet',
//     'getlatestblockheight',
// );



// function getUsername(str){
//     return str.split('.')[0]
// }
// // 先delay
// client.on('connect', ()=>{
//     client.on('message', (src, payload, payloadType, encrypt) => {
//         console.log( payloadType + 'Receive', encrypt ? 'encrypted' : 'unencrypted',  'message', '"' + payload + '"','from', src, 'afterms');
//         // Send a text response
//         console.log(src);
//         store.dispatch({ type: 'INCREMENT' , payload: { id: Date.now(), content: payload, username: getUsername(src)}});
//         return 'Well received!';
//     });
// });


// export default class ChatBrower extends PureComponent{
//     constructor(){
//         super();
//         this.state = {
//             inputValue: "",
//             arrmsg: []
//         };
//         this.join();
//         console.log('init');
//     }

//     sendMsg = (e)=>{
//         if(e.keyCode === 13){
//             this.setState({
//                 inputValue: ""
//             })
//             client.publish("lcj77", e.target.value, { txPool: true });
//         }        
//     }

//     onChangeValue = (e)=>{
//         this.setState({
//             inputValue: e.target.value
//         })
//     }

//     join = (topic = 'lcj77') => {
//         const subinfo = client.defaultClient.getSubscription(topic, client.addr)
//         Promise.all([subinfo,latestBlockHeight]).then(async ([info, blockheight])=>{
//             if(info.expiresAt - blockheight > 5000){
//                 return Promise.reject('Too soon.');
//             }else{
//                 return wallet.subscribe(topic, 5000, localStorage.getItem('username'))
//             }
//         })
//     }

//     componentDidMount() {
//         console.log('mount');
//         store.subscribe(() => {
//             this.setState(
//                 {
//                     arrmsg: store.getState()
//                 }
//             )
//         });
//     };

//     componentWillUnmount() {
//         store.subscribe(() => {
//             console.log(store.getState());
//         })
//     }

//     render(){
//         const {  inputValue, arrmsg } = this.state;
//         return(
//             <div className="chatclient" style={{height:"80vh"}}>
//                 <div className="chatSection">
//                     {
//                         arrmsg.map(({content, username, id})=>{
//                             return(
//                                 <div key={id}>{username}: {content}</div>
//                             )
//                         })
//                     }
//                 </div>
//                 <div style={{margin:"1rem 0"}}>
//                     <Input onKeyDown={this.sendMsg} onChange={this.onChangeValue} value={inputValue}/>
//                 </div>
//             </div>
//         )
//     }
// }

import React from 'react';
import { Input } from 'reactstrap';
import './index.scss';

function Client() {
    return (
        <div className="client-chat">
            <hr />
            <div>聊天室</div>
            <hr />
            <section className="section">
                <div className="message-wrap">
                    <span className="user">username:</span>
                    <span className="message">message</span>
                </div>
            </section>
            <footer>
                <Input />
            </footer>
        </div>
    );
}

export default Client;
