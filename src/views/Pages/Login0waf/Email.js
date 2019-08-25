import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
export default ()=>(
    <InputGroup style={{margin : '1.3rem 0'}}>
        <InputGroupAddon addonType="append">
            <InputGroupText>
                    <i className="fa fa-envelope-o"></i> 
            </InputGroupText>
        </InputGroupAddon>
        <Input type="email" id="email" name="email" placeholder="Email" required/>            
    </InputGroup>
)


