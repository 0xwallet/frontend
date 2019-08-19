import React from 'react';
import {Card,CardBody,CardHeader} from 'reactstrap';

import Avatar from './Avatar';
import Detail from './Detail';
import Locking from './Detail/Components/Locking';

export default (props)=>{
    const { auth, onAuth, onVerify } = props;
    return(
        <Card>
            <CardHeader>user info
                <Locking onAuth={onAuth} onVerify={onVerify} auth={auth}/>
            </CardHeader>
            <CardBody style={{display: 'flex'}}>
                <Avatar />
                <Detail auth={auth}/>
            </CardBody>
        </Card>
    )
}