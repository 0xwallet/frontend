import React,{ PureComponent } from 'react';
import { Input } from 'reactstrap';
import nkn from 'nkn-multiclient';
// import rpcCall from 'nkn-client/lib/rpc';
import nknWallet from 'nkn-wallet';
import { createStore } from 'redux';
import './index.scss';
const msgarr = [];
function counter(state = msgarr, action) {
  switch (action.type) {
  case 'INCREMENT':
    return [...state, action.payload];
  default:
    return state;
  }
}

let store = createStore(counter);

const token = localStorage.getItem('auth-token');
const seedarr = token.split('.');
const seed = seedarr[0].substr(0,6) + seedarr[1];
const wallet = nknWallet.restoreWalletBySeed(seed, seedarr[2]);

nknWallet.configure({
    rpcAddr: 'https://owaf.io',
});

// const latestBlockHeight = rpcCall(
//     getRandomSeed(),
//     'getlatestblockheight',
// );

const client = nkn({
    originalClient: true,
    identifier: localStorage.getItem('username'),
    seed: wallet.getSeed(),
    seedRpcServerAddr: 'https://owaf.io',
    msgHoldingSeconds: 3999999999,
});

// sub();
if(!localStorage.getItem('count')){
    subscribe();
}

function subscribe(){
    wallet.subscribe('topic', 50000, localStorage.getItem('username'))
    .then(function(data) {
        console.log('Subscribe success:', data);
        localStorage.setItem('count', "lcj");
    }).catch(function(error) {
        console.log('Subscribe fail:', error);
    });
}

function getUsername(str){
    return str.split('.')[0]
}

client.on('connect', ()=>{
    client.on('message', (src, payload, payloadType, encrypt) => {
        console.log( payloadType + 'Receive', encrypt ? 'encrypted' : 'unencrypted',  'message', '"' + payload + '"','from', src, 'afterms');
        // Send a text response
        store.dispatch({ type: 'INCREMENT' , payload: { id: Date.now(), content: payload, username: getUsername(src)}});
        return 'Well received!';
    });
})


export default class ChatBrower extends PureComponent{
    constructor(){
        super();
        this.state = {
            inputValue: "",
            arrmsg: []
        }
    }

    sendMsg = (e)=>{
        if(e.keyCode === 13){
            this.setState({
                inputValue: ""
            })
            client.publish('topic', e.target.value, { txPool: true });
        }        
    }

    onChangeValue = (e)=>{
        this.setState({
            inputValue: e.target.value
        })
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState(
                {
                    arrmsg: store.getState()
                }
            )
        });
    }

    render(){
        const {  inputValue, arrmsg } = this.state;
        return(
            <div className="chatclient" style={{height:"80vh"}}>
                <div className="chatSection">
                    {
                        arrmsg.map(({content, username, id})=>{
                            return(
                                <div key={id}>{username}: {content}</div>
                            )
                        })
                    }
                </div>
                <div style={{margin:"1rem 0"}}>
                    <Input onKeyDown={this.sendMsg} onChange={this.onChangeValue} value={inputValue} />
                </div>
            </div>
        )
    }
}