import React,{ PureComponent } from 'react';
import { Input, Button } from 'reactstrap';
import nkn from 'nkn-multiclient';
import rpcCall from 'nkn-client/lib/rpc';
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
    // rpcAddr: 'https://owaf.io',
    rpcAddr: 'https://mainnet-seed-0001.nkn.org:30003',
});

const client = nkn({
    originalClient: true,
    identifier: localStorage.getItem('username'),
    seed: wallet.getSeed(),
    seedRpcServerAddr: 'https://mainnet-seed-0001.nkn.org:30003',
    msgHoldingSeconds: 3999999999,
});

const latestBlockHeight = rpcCall(
    // 'https://owaf.io',
    'https://mainnet-seed-0001.nkn.org:30003',
    'getlatestblockheight',
);



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
            client.publish("lcj", e.target.value, { txPool: true });
        }        
    }

    onChangeValue = (e)=>{
        this.setState({
            inputValue: e.target.value
        })
    }

    join = () => {
        const subinfo = client.defaultClient.getSubscription('lcj', client.addr)

        Promise.all([subinfo,latestBlockHeight]).then(([info, blockheight])=>{
            console.log(info.expiresAt, blockheight);
        if(info.expiresAt - blockheight > 5000){
            return Promise.reject('Too soon.');
        }else{
            subscribe()
        }
        })

        function subscribe(topic){
            wallet.subscribe('lcj', 5000, localStorage.getItem('username'))
            .then(function(data) {
                console.log('Subscribe success:', data, '');
                localStorage.setItem('count', "lcj");
            }).catch(function(error) {
                console.log('Subscribe fail:', error);
            });
        }
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
                    <Button onClick={this.join}>join a channel</Button>
                    <Input onKeyDown={this.sendMsg} onChange={this.onChangeValue} value={inputValue}/>
                </div>
            </div>
        )
    }
}