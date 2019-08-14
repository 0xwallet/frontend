import React from 'react';
import {Card,CardBody,CardHeader} from 'reactstrap';
import Locking from '../Components/Locking';

export default (props)=>{
    const { onAuth ,auth, onVerify} = props
    return(
        <Card>
            <CardHeader>subscription info
                <Locking onAuth={onAuth} onVerify={onVerify} auth={auth}/>
            </CardHeader>
            <CardBody>
                {auth?'haveauth': 'noauth'}
            </CardBody>
        </Card>
    )
}