import React from 'react';
import Viewer from './Viewer'
import Calendar from './Calendar';
import NknClient from './NknClient';

export default ()=>{
   return( 
        <div>
            <Calendar />
            <Viewer />
            <NknClient/>
        </div>
    )
}