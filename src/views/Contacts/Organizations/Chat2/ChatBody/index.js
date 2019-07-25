import React,{useState} from 'react';
import { Input } from 'reactstrap';
import Message from './Message';
import './index.scss';

export default (props)=>{
    const [message,setMessage] = useState('');
    // const [msgList,setMsgList] = useState([]);
    function handleChange(e){
        setMessage(e.target.value);
    }
    function handlesend(e){
        const evt = e || window.event;
        if(evt.keyCode === 13){
            console.log(message,'message')
            setMessage('')
        }
    }
    return(
        <div className="chatbody">
            <h3 style={{borderBottom:'1px solid #ccc'}}>{props.name}</h3>
            <Message message="hello world"/>
            <Message message="hello"/>
            <Message message="hello worldxx"/>
            <Message message="hello worldopopopo"/>
            <Message message="hello world"/>
            <footer>
                <Input type="text" onKeyDown={handlesend} onChange={handleChange} value={message}/>
            </footer>
        </div>
    )
}