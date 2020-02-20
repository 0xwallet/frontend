import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import Email from '../../../../Pages/Login0waf/Email';

function Addr(props) {
  const { username, email } = props;
  const { publickey } = JSON.parse(localStorage.getItem(email));
  return (
    <div style={{ paddingTop: '20px', borderBottom: '1px solid #c8ced3' }}>
        {/* <Col> */}
          <Card className="text-white bg-primary">
            <CardBody>
              <blockquote className="card-bodyquote" style={{ position: 'relative' }}>
                <p>{username}.{publickey}</p>
                <footer>
                  <span> 
                    <i className="cui-check icons font-xl" style={{ color: '#4dbd74' }}></i> 
                  </span>
                  <span style={{ color: "#2f353a", marginRight: '8px' }}>Primary</span>
                  <cite title="Source Title">NKN Pubkey Address</cite>
                </footer>
                <Button color="light" outline className="btn-pill" style={{ padding: '0 10px', marginTop: '5px' }}>Share</Button>
                <i className="fa fa-qrcode font-2xl" style={{ position: "absolute", top: 0, right: 0 }}></i>
                <i className="cui-options icons font-2xl mt-4" style={{ position: "absolute", bottom: 0, right: 0 }}></i>
              </blockquote>
            </CardBody>
          </Card>
        {/* </Col> */}
    </div>
  );
}

export default Addr;
