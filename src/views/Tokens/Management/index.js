import React,{ PureComponent } from 'react';
// import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import Model from './Model';

 class Management extends PureComponent{
    constructor(){
      super();
      this.openModal = this.openModal.bind(this);
      this.onOk = this.onOk.bind(this);
      this.onCancel = this.onCancel.bind(this);

      this.state = {
        visibility: false
      }
    }

    openModal(){
      this.setState({
        visibility: true
      })
    }

    onCancel(){
      this.setState({
        visibility: false
      })
    }

    onOk(){
      this.setState({
        visibility: false
      })
    }

    render(){
        return (
          <div>
            <p>
              <Button color="info" onClick={this.openModal}>open model</Button>
            </p>
            <Model visibility={this.state.visibility} onOk={this.onOk} onCancel={this.onCancel}>
              <p>childrec</p>
            </Model>
          </div>
        )
    }
}

// function mapStateToProps(state){
//     return{
//       auth : state.upgrade.auth
//     }
//   }
  
// export default connect(mapStateToProps)(Management);
export default Management