import React, { useState, useEffect } from 'react';
import Viewer from './Viewer';
import Calendar from './Calendar';
import DetailList from './DetailList';

export default () => {
   const [memberFromName, setMemberList] = useState('channels');
   const [memberFromId, setMemberListId] = useState('');
   const [ids, setIds] = useState({
        organizations: "",
        channels: "",
        tasks: "",
        income: "",
    })
   // 做一个缓存处理，(防止id污染);
   useEffect(() => {
    const cloneIds = {...ids, [memberFromName]: memberFromId};
    setIds(cloneIds);
   }, [memberFromId]);

   return( 
        <div>
            <Calendar />
            <Viewer onChangeName={setMemberList} onChangeId={setMemberListId} />
            <DetailList memberFromName={memberFromName} id={ids[memberFromName]} />
        </div>
    )
}