import React,{ PureComponent } from 'react';
import { Input } from 'reactstrap';
import imgUrl from '../../../../assets/logo.png';
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
                {/* <h2>OxWallet</h2> */}
                <div className="logo">
                    <img src={imgUrl} alt="logo"/>
                </div>
                <div className="sendmsg">
                    <Input onKeyDown={this.sendMsg}/>
                </div>
            </div>
        )
    }
}