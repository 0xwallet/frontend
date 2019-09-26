import React,{ PureComponent } from 'react';
import { Input } from 'reactstrap';
import nkn from 'nkn-multiclient';
// import rpcCall from 'nkn-client/lib/rpc';
import nknWallet from 'nkn-wallet';
import './index.scss';

const SEED_ADDRESSES = [
	'http://mainnet-seed-0001.nkn.org:30003',
	'http://mainnet-seed-0002.nkn.org:30003',
	'http://mainnet-seed-0003.nkn.org:30003',
	'http://mainnet-seed-0004.nkn.org:30003',
	'http://mainnet-seed-0005.nkn.org:30003',
	'http://mainnet-seed-0006.nkn.org:30003',
	'http://mainnet-seed-0007.nkn.org:30003',
	'http://mainnet-seed-0008.nkn.org:30003',
	'http://mainnet-seed-0009.nkn.org:30003',
	'http://mainnet-seed-0010.nkn.org:30003',
	'http://mainnet-seed-0011.nkn.org:30003',
	'http://mainnet-seed-0012.nkn.org:30003',
	'http://mainnet-seed-0013.nkn.org:30003',
	'http://mainnet-seed-0014.nkn.org:30003',
	'http://mainnet-seed-0015.nkn.org:30003',
	'http://mainnet-seed-0016.nkn.org:30003',
	'http://mainnet-seed-0017.nkn.org:30003',
	'http://mainnet-seed-0018.nkn.org:30003',
	'http://mainnet-seed-0019.nkn.org:30003',
	'http://mainnet-seed-0020.nkn.org:30003',
	'http://mainnet-seed-0021.nkn.org:30003',
	'http://mainnet-seed-0022.nkn.org:30003',
	'http://mainnet-seed-0023.nkn.org:30003',
	'http://mainnet-seed-0024.nkn.org:30003',
	'http://mainnet-seed-0025.nkn.org:30003',
	'http://mainnet-seed-0026.nkn.org:30003',
	'http://mainnet-seed-0027.nkn.org:30003',
	'http://mainnet-seed-0028.nkn.org:30003',
	'http://mainnet-seed-0029.nkn.org:30003',
	'http://mainnet-seed-0030.nkn.org:30003',
	'http://mainnet-seed-0031.nkn.org:30003',
	'http://mainnet-seed-0032.nkn.org:30003',
	'http://mainnet-seed-0033.nkn.org:30003',
	'http://mainnet-seed-0034.nkn.org:30003',
	'http://mainnet-seed-0035.nkn.org:30003',
	'http://mainnet-seed-0036.nkn.org:30003',
	'http://mainnet-seed-0037.nkn.org:30003',
	'http://mainnet-seed-0038.nkn.org:30003',
	'http://mainnet-seed-0039.nkn.org:30003',
	'http://mainnet-seed-0040.nkn.org:30003',
	'http://mainnet-seed-0041.nkn.org:30003',
	'http://mainnet-seed-0042.nkn.org:30003',
	'http://mainnet-seed-0043.nkn.org:30003',
	'http://mainnet-seed-0044.nkn.org:30003',
];
const getRandomSeed = () =>
	SEED_ADDRESSES[Math.floor(Math.random() * SEED_ADDRESSES.length)];

const token = localStorage.getItem('auth-token');
const seedarr = token.split('.');
const seed = seedarr[0].substr(0,6) + seedarr[1];
const wallet = nknWallet.restoreWalletBySeed(seed, seedarr[2]);

nknWallet.configure({
    rpcAddr: getRandomSeed(),
});

// const latestBlockHeight = rpcCall(
//     getRandomSeed(),
//     'getlatestblockheight',
// );

// Promise.all([latestBlockHeight]).then(([height])=>{

// })

const client = nkn({
    originalClient: true,
    identifier: localStorage.getItem('username'),
    seed: wallet.getSeed(),
    seedRpcServerAddr: getRandomSeed(),
    msgHoldingSeconds: 3999999999,
});

// sub();
if(!localStorage.getItem('count')){
    subscribe();
}

function subscribe(){
    wallet.subscribe('topic', 10, localStorage.getItem('username'))
    .then(function(data) {
        console.log('Subscribe success:', data);
        localStorage.setItem('count', "lcj")
    }).catch(function(error) {
        console.log('Subscribe fail:', error);
    });
}


const arr = [];

client.on('connect', ()=>{
    client.on('message', (src, payload, payloadType, encrypt) => {
        console.log( payloadType + 'Receive', encrypt ? 'encrypted' : 'unencrypted',  'message', '"' + payload + '"','from', src, 'afterms');
        // Send a text response
        arr.push({
            id: Date.now(),
            content: payload
        });
        console.log(arr,'hello world')
        return 'Well received!';
    });
})


export default class ChatBrower extends PureComponent{
    constructor(){
        super();
        this.state = {
            msgArr: [],
            inputValue: "",
            receive: "",
        }
    }

    sendMsg = (e)=>{
        const { msgArr } = this.state;
        const cloneArr = [...msgArr];
        if(e.keyCode === 13){
            cloneArr.push({
                detail: e.target.value,
                id: Date.now()
            })
            this.setState({
                msgArr: cloneArr,
                inputValue: ""
            })

            this.sendToServer(e.target.value);
        }        
    }

    onChangeValue = (e)=>{
        this.setState({
            inputValue: e.target.value
        })
    }

    sendToServer = (message) => {
        client.publish('topic', message, { txPool: true });
    }

    render(){
        const {  inputValue } = this.state;
        return(
            <div className="chatclient" style={{height:"80vh"}}>
                <div className="chatSection">
                    {
                        arr.map((v)=>{
                            return(
                                <div key={v.id}>{v.content}</div>
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