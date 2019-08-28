import React,{ PureComponent } from 'react';
import { Input } from 'reactstrap';
import nkn from 'nkn-client';
import './index.scss';
export default class ChatBrower extends PureComponent{
    sendMsg = (e)=>{
        const client = nkn({
            identifier: 'fromClient',
            seed: '2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0',
            seedRpcServerAddr: 'http://localhost:8888/nkn',
        });
        // toClient.8488c5ee3010ec45989ffcbf5c74283e23d0f18c4f8e9ea2f6adb1a942dc8d74
        // console.log(client.addr);
        // console.log(client.key.seed, client.key.privateKey, client.key.publicKey)；
        client.on('connect',()=>{
            client.send(
                // 'toClient.8488c5ee3010ec45989ffcbf5c74283e23d0f18c4f8e9ea2f6adb1a942dc8d74',
                'testclient.da4fa91c08e28f45f32aa8d0ac37ccacfcd64611e99ba19bdd578222fcf84623',
                // testclient.addr,
                'hello worltest addr!',
            ).then(() => {
                console.log('Receive ACK');
            }).catch((e) => {
            // This will most likely to be timeout
                console.log('Catch:', e);
            });
        })
        this.receive();
    }

    receive = ()=>{
        console.log('hello world')
        let toClient = nkn({
            identifier: 'testclient',
            // seed: '2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0',
            seedRpcServerAddr: 'http://localhost:8888/nkn',
        })
        toClient.on('message', (src, payload, payloadType, encrypt) => {
            if (payloadType === nkn.PayloadType.TEXT) {
              console.log('Receive text message:', src, payload);
            } else if (payloadType === nkn.PayloadType.BINARY) {
              console.log('Receive binary message:', src, payload);
            }
            console.log('Message is', encrypt ? 'encrypted' : 'unencrypted');
        });
    }
    render(){
        const { id } = this.props;
        return(
            <div className="chatclient">
                <h1>Chat Client___{id}</h1>
                <div className="chatSection">
                </div>
                <Input onKeyDown={this.sendMsg}/>
            </div>
        )
    }
}