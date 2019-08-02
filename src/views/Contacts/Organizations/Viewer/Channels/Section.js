import React from 'react';
import ChatBody from './ChatBody'

export default (props)=>{
    const {channel} = props;
    
    return(
        <section>
                <ChatBody channel={channel} {...props}>
                    {props.children}
                </ChatBody>
        </section>
    )
}