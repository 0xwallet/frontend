import React from 'react';
import {Card,CardHeader,CardBody,Button} from 'reactstrap';
import Locking from '../components/Locking';
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
            <CardBody>
                <Demo/>
                <Button color="danger" disabled={auth?false: true}>test</Button>
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
          <Step title="verify code" description="1/3" />
          <Step title="fidokey" description="2/3" />
          <Step title="fingerprint" description="3/3" />
        </Steps>
      </div>
    );
  }
}
