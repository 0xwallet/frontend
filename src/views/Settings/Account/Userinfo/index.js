import React from 'react';
import {Card,CardBody,CardHeader} from 'reactstrap';
import Avatar from './Avatar';
import Detail from './Detail';
export default ()=>{
    return(
        <Card>
            <CardHeader>user info</CardHeader>
            <CardBody style={{display: 'flex'}}>
                <Avatar />
                <Detail />
            </CardBody>
        </Card>
    )
}