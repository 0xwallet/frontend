import React from 'react';
import {Input} from 'reactstrap'
import './index.scss';
function formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n;
}
// 参数number为毫秒时间戳，format为需要转换成的日期格式
function formatTime (number, format) {
    let time = new Date(number);
    const minutes = formatNumber(time.getMinutes());
    let hour = formatNumber(time.getHours());
    if(hour > 12){
        hour = hour - 12;
        return `${hour}:${minutes} PM `
    }else{
        return `${hour}:${minutes} AM `
    }
}

export default (props)=>{
    return(
        <div className="chatbody">
            <section id="section">
                {
                    props.chatmsg.map((v,i)=>{
                        return(
                            <div key={i} className="msgwrap">
                            <div className="img"></div>
                             <div>
                                 <div> <span className="user">lcj</span> <span className="date">{formatTime(v.date,'Y年M月D日 h:m:s')}</span></div>
                                 <div className="msgbody">{v.info}</div>
                                 

                                 {/* {
                                     v.msg.map()
                                 } */}
                             </div>
                            </div>
                        )
                    })
                }
                {
                    props.children
                }
            </section>
            <footer className="sendmsg">
                <Input type="text" onKeyDown={props.onmsg}  onChange={(e)=>{
                    props.onChange(e.target.value)
                }} value={props.value}/>
            </footer>
        </div>
    )
}