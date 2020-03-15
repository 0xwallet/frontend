import React from 'react';
import { Card,CardBody,CardHeader } from 'reactstrap';
// import propTypes from 'prop-types';
// import Locking from '../Components/Locking';

function AppItem() {
    return (
        <div style={{ 
            height: '80px', flex: 1, background: "pink", border: '#000', marginRight: '10px', borderRadius: '10px',
            lineHeight: '80px',
            position: 'relative',
            paddingLeft: '10px',
        }}
        >
            <span 
                style={{
                    width: '10px',
                    height: '80px',
                    background: '#000',
                    border: '#000',
                    borderRadius: '10px 0 0 10px',
                    position: 'absolute',
                    left: '0',
                }}
            />
            test
        </div>
    );
}

function Apps() {
    return (
    <Card>
            <CardHeader>
                <strong>Apps</strong>
                <span style={{ float: 'right', padding: '0 8px', border: '1px solid #000', borderRadius: '5px' }}>create new apps</span>
                {/* <Locking onAuth={onAuth} onVerify={onVerify} auth={auth}/> */}
            </CardHeader>
            <CardBody style={{ display: 'flex' }}>
                {/* {auth?'haveauth': 'noauth'} */}
                <AppItem />
                <AppItem />
            </CardBody>
        </Card>
    );
}

// Apps.propTypes = {
//     onAuth: propTypes.bool,
//     auth: propTypes.any,
//     onVerify: propTypes.any,
// };

export default Apps;