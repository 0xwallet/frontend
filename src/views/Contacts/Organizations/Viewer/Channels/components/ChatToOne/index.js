import React,{PureComponent}from 'react';
import {Button} from 'reactstrap';
// import nkn from 'nkn-client';
export default class ChatToOne extends PureComponent{
    sendMsg = ()=>{
       
    }
    render(){
        return(
            <div>
                <Button onClick={this.sendMsg}>ChatToOne</Button>
            </div>
        )
    }
}