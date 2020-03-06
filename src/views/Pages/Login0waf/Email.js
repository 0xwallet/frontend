import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';

function Email(props) {
    const { onChangeEmailValue, onKeyDown, isCorrect } = props;
    console.log('here, here');
    return (
        <InputGroup style={{margin : '1.3rem 0', position: 'relative' }}>
            <InputGroupAddon addonType="append">
                <InputGroupText>
                    <i className="fa fa-envelope-o"></i> 
                </InputGroupText>
            </InputGroupAddon>
            <Input type="email" id="email" name="email" placeholder="Email" required 
                onChange={onChangeEmailValue}
                autoFocus spellCheck={false}
                onKeyDown={onKeyDown}
            />
            <span 
            style={{ 
                position: 'absolute', left: 0, fontSize: '12px', color: 'red', bottom: -18,
                display: isCorrect ? 'none' : 'inline-block'
            }}>Please enter the correct email format</span>
        </InputGroup> 
    );
}

export default Email;
