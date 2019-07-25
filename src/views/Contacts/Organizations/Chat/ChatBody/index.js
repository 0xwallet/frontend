import React,{useState} from 'react';
import { Input } from 'reactstrap';
import Message from './Message';

import './index.scss';
export default (props)=>{
    const [message,setMessage] = useState('');
    const [msgList,setMsgList] = useState([]);
    function handleChange(e){
        setMessage(e.target.value);
    }
    function handlesend(e){
        const evt = e || window.event;
        if(evt.keyCode === 13){
            setMessage('')
        }
    }
    return(
        <div className="chatBody">
            <h4 className="username">
                {props.username}
            </h4>
            {/* section */}
            <section>
               <Message/>
            </section>
            <div className="inputmsg">
            <Input type="text"
                className="input"
                name="inputmsg"
                id="inputmsg"
                onChange={handleChange}
                onKeyDown={handlesend}
                value={message}
              />
            </div>
        </div>
    )
}