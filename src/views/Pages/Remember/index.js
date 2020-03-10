import React from 'react';
import { Input, Label, FormGroup } from 'reactstrap';
import propTypes from 'prop-types';
import './index.scss';

function Remember (props) {
    const { onRemember, onForget, forget, onLogin } = props;
    const handleRemember = () => {
        onRemember();
    }
    const handleForget = () => {
        onForget();
    }
    const handleLogin = () => {
        onLogin();
    }
    return (
        <>
            {
                forget 
                ? <div style={{ margin: '10px 5px 0 0' }}>remember password?<span className="webauthn" onClick={handleLogin}>login now</span></div> 
                : (
                    <div className="remember">
                        <FormGroup check inline>
                            <Input required className="form-check-input" type="checkbox" id="in" name="remember" onClick={handleRemember} />
                            <Label className="form-check-label" check htmlFor="remember">remember me</Label>
                        </FormGroup>
                        <span className="webauthn" onClick={handleForget}>forget password</span>
                    </div>
                )
            }
        </>
    );
}

Remember.propTypes = {
    onRemember: propTypes.func.isRequired,
    onForget: propTypes.func.isRequired,
    onLogin: propTypes.func.isRequired,
    forget: propTypes.bool.isRequired,
}

export default Remember;
