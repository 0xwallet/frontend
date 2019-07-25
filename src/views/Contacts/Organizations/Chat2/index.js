import React,{ PureComponent } from 'react';
// import {Container} from 'reactstrap'

import ChatList from './ChatList';
import ChatBody from './ChatBody';
import './index.scss';

export default class Chat2 extends PureComponent{
    state={
        name : "# laoli1"
    }
    
    msgToAddr = (name)=>{
        this.setState({
            name
        })
    }

    render(){
        const {name} = this.state;
        const bodyprops = {
            name
        }
        const listprops = {
            msgToAddr: this.msgToAddr
        }
        return(
            <div className="chatRoot">
                <ChatList {...listprops}/>
                <ChatBody {...bodyprops}/>
            </div>
        )
    }
}