import React,{PureComponent} from 'react';
import { Button ,Jumbotron, Card, CardHeader,CardBody} from 'reactstrap'
// import {connect} from 'react-redux';

class Issuer extends PureComponent{
  constructor(){
    super();
    this.upGrade = this.upGrade.bind(this);
  }

  upGrade(){
    this.props.history.push('/upgrade');
  }

  render(){
   return (
    <div>
    <Card>
      <CardHeader>
        <i className="fa fa-align-justify"></i><strong>Issuer</strong>
        <div className="card-header-actions">
          <a href="https://reactstrap.github.io/components/jumbotron/" rel="noreferrer noopener" target="_blank" className="card-header-action">
            <small className="text-muted">docs</small>
          </a>
        </div>
      </CardHeader>
      <CardBody>
        <Jumbotron>
          <h1 className="display-3">Hello, Guest!</h1>
          <p className="lead">Your account has no access rights</p>
          <hr className="my-2" />
          <p>Please upGrade your account!</p>
          <p className="lead">
            <Button color="primary" onClick={this.upGrade}>upGrade</Button>
          </p>
        </Jumbotron>
      </CardBody>
    </Card>
    </div>
   )
  }
}

// function mapStateToProps(state){
//   return{
//     auth : state.upgrade.auth
//   }
// }

// export default connect(mapStateToProps)(Issuer);
export default Issuer;