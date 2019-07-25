import React,{useState}from 'react';

import './index.scss';

export default (props)=>{
    const userlist = [
        { username: "laoli",recentmsg : "hello world"},
        { username: "laoli2",recentmsg : "hello world"},
        { username: "laoli3",recentmsg : "hello world"},
        { username: "laoli4",recentmsg : "hello world"},
        { username: "laoli5",recentmsg : "hello world"},
        { username: "laoli6",recentmsg : "hello world"},
        { username: "laoli7",recentmsg : "hello world"},
        { username: "laoli",recentmsg : "hello world"},
        { username: "laoli2",recentmsg : "hello world"},
        { username: "laoli3",recentmsg : "hello world"},
        { username: "laoli4",recentmsg : "hello world"},
        { username: "laoli5",recentmsg : "hello world"},
        { username: "laoli6",recentmsg : "hello world"},
        { username: "laoli7",recentmsg : "hello world"},
    ]
    const [list] = useState(userlist)
    return(
        <div className="userlist">
            <div className="search">
                <form>
                    <label htmlFor="search">
                    <i className="fa fa-search"/>
                    </label>
                    <input type="search" id="search" placeholder="Search..." autoComplete="off"/>
                </form>
            </div>
            <section>
                {
                    list.map((v,i)=>{
                        return(
                            <div className="listitem" key={i} onClick={()=>{
                                props.chatToPerson(v.username)
                            }}>
                                <div className="circle">
                                   
                                </div>
                                <div className="msg">
                                    <p className="username">{v.username}</p>
                                    <p className="recentmsg">{v.recentmsg}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}