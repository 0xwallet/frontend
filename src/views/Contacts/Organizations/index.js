import React, { useState } from 'react';
import Viewer from './Viewer';
import Calendar from './Calendar';
import DetailList from './DetailList';

export default () => {
   const [memberFromName, setMemberList] = useState('channels');
   const [currentCardName, setCurrentCardName] = useState('channels');
   return( 
        <div>
            <Calendar />
            <Viewer onChangeName={setMemberList}/>
            <DetailList memberFromName={memberFromName}/>
        </div>
    )
}