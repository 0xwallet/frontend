import React from 'react';
import {Card,CardHeader,CardBody} from 'reactstrap';
import Locking from '../components/Locking';
import Draggable from '../components/Drag';
import { Steps } from 'antd';
import "antd/dist/antd.css";
const { Step } = Steps;

export default (props)=>{
    const {auth,onAuth} = props;
    return(
        <Card>
            <CardHeader>
            Authorizations
            <div className="card-header-actions">
                <Locking onAuth={onAuth} auth={auth}/>
            </div>
            </CardHeader>
            <CardBody >
                  <Demo/>
                  <div className="dragwrap" style={{display: 'flex',marginTop: '1rem',padding:'0',justifyContent:"space-between"}}>
                      <Draggable auth={auth}/>
                  </div>
            </CardBody>
        </Card>
    )
}

class Demo extends React.Component {
  state = {
    current: 0,
  };

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

  render() {
    // const { current } = this.state;

    return (
      <div>
        <Steps current={3}>
          <Step title="verification code" description="1 of 3 " />
          <Step title="Fido Key" description="2 of 3" />
          <Step title="Fido FP" description="3 of 3" />
        </Steps>
      </div>
    );
  }
}
