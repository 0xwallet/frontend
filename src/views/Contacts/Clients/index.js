import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
import { getNKNAddr, newNKNClient } from '../../../util/nkn3';

export default class Client extends PureComponent{
    render() {
        return(
            <div>
                <NknChat/>
            </div>
        )
    }
}

class NknChat extends PureComponent{
    state = {
        username: "lcj"
    }

    tochatroom = () => {
        console.log('start');
        const { username } = this.state; 
        let nknClient = newNKNClient(username);

        nknClient.on("connect",()=>{
            this.nknClient = nknClient;
            this.nknClient.send(getNKNAddr("opop"), "hello opop");
        })

        nknClient.on('message', (src, payload, payloadType) => {
            let data = JSON.parse(payload);
            this.receiveMessage(data.chatID, data.message);
        });
        
    }
    render(){
        return(
            <div>
                <Button onClick={this.tochatroom}>ontest</Button>
            </div>
        )
    }
}