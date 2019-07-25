import React from 'react';
import './index.scss';

export default (props)=>{
    const { toPerson = false} = props;
    const wrapstyle = {
        justifyContent : toPerson? 'flex-start' : 'flex-end'
    }

    const headstyle = {
        marginLeft : toPerson ? '' : '.5rem',
        marginRight : toPerson ? '.5rem' : ''
    }

    function Msg(){
        if(!toPerson){
            // user
            return(
                <div className="msgContainer" style={wrapstyle}>
                    <div className="message">message</div>
                    <div className="headimg" style={headstyle}></div>
                </div>
            )
        }else{
            // person
            return(
                <div className="msgContainer" style={wrapstyle}>
                    <div className="headimg" style={headstyle}></div>
                    <div className="message">message</div>
                </div>
            )
        }
    }

    return(
       <Msg/>
    )
}