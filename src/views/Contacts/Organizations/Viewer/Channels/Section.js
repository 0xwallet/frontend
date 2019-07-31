import React from 'react';

export default (props)=>{
    const {channel} = props;
    return(
        <section>
            {
                props.children ?    
                <div className="search">{props.children}</div> : <div> chat with {channel}</div>
            }
        </section>
    )
}