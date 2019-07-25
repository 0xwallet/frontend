import React from 'react';
import ListGroup from './ListGroup';
import './index.scss';

export default (props)=>{
    return(
        <div className="chatlist">
            <h1 style={{color:"#5c6873"}}>Acme Site</h1>
            <ListGroup title="Started" {...props}/>
            <ListGroup title="Channels" {...props}/>
            <ListGroup title="Direct Message" {...props}/>
        </div>
    )
}