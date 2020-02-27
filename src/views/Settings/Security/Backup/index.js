import React,{ useState, useEffect } from 'react';
import {Card,CardHeader,CardBody,Input,Form,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import Locking from '../components/Locking';

function Backup(props) {
    const { auth, onAuth } = props;
    const [value,setValue] = useState('');
    return(
        <Card className="keys">
        <CardHeader>My Contact
        <div className="card-header-actions">
            <Locking onAuth={onAuth} auth={auth}/>
        </div>
        </CardHeader>
        <CardBody>
            <div className="backup"> 
                <Form row="true" onSubmit={props.register} id="login">
                {/* <InputGroup style={{margin : '1.3rem 0'}}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            <i className="cui cui-phone"></i> 
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="email" id="email" name="phone" placeholder="phone" disabled={auth?false:true}/>            
                </InputGroup> */}
                <PhoneInput placeholder="Enter phone number" value={ value } onChange={ phone => setValue( phone) }
disabled={auth?false:true}/>
                <InputGroup style={{margin : '1.3rem 0'}}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            <i className="cui-laptop"></i> 
                        </InputGroupText>
                    </InputGroupAddon> 
                    <Input type="text" id="nknaddr" name="nknaddr" placeholder="nkn addr" disabled={auth?false:true}/>            
                </InputGroup>
                </Form>
            </div>
        </CardBody>
        </Card>
    )
}

export default Backup;
