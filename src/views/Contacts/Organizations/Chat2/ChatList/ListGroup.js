import React from 'react';
import {ListGroup,ListGroupItem} from 'reactstrap';

export default (props)=>{
    const {title,msgToAddr} = props;
    const list = [{username:"# laoli1"},{username:"# laoli3"},{username:"# laoli4"}]
    return(
        <div style={{marginBottom:'.7rem'}}>
            <div className="nav">{title}</div>
            <ListGroup>
                {
                    list.map((v,i)=>(
                        <ListGroupItem action className="listitem" key={i} onClick={()=>{
                            msgToAddr(v.username)
                        }}>{v.username}</ListGroupItem>
                    ))
                }   
            </ListGroup>
        </div> 
    )
}