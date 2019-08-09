import React from 'react';
import {Card,CardHeader,CardBody,Input,Form,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap';
import Locking from '../components/Locking';
export default (props)=>{
    const { auth, onAuth } = props;
    return(
        <Card className="keys">
        <CardHeader>Backup
        <div className="card-header-actions">
            <Locking onAuth={onAuth} auth={auth}/>
        </div>
        </CardHeader>
        <CardBody>
            <div className="backup"> 
                <Form row="true" onSubmit={props.register} id="login">
                <InputGroup style={{margin : '1.3rem 0'}}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            <i className="cui cui-phone"></i> 
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="email" id="email" name="phone" placeholder="phone" disabled={auth?false:true}/>            
                </InputGroup>
                <InputGroup style={{margin : '1.3rem 0'}}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            <i className="fa fa-envelope-o"></i> 
                        </InputGroupText>
                    </InputGroupAddon> 
                    <Input type="email" id="email" name="email" placeholder="Email" disabled={auth?false:true}/>            
                </InputGroup>
                </Form>
            </div>
        </CardBody>
        </Card>
    )
}