import React,{ PureComponent } from 'react';
import { Input } from 'reactstrap';
import './index.scss';
export default class ChatBrower extends PureComponent{
    sendMsg = (e)=>{
        const { id, connectChannel } = this.props;
        if(e.keyCode === 13){
            connectChannel(e.target.value,id)
        }
    }
    render() {
        return(
            <div className="chatBrower">
                <h2>OxWallet</h2>
                <p>
                    <Input onKeyDown={this.sendMsg}/>
                </p>
            </div>
        )
    }
}