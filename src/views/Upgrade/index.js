import React,{ PureComponent } from 'react';
import { Button } from 'reactstrap';
// import axios from 'axios';
import { connect } from 'react-redux';

class Upgrade extends PureComponent{
    constructor(){
        super();
        this.upGrade = this.upGrade.bind(this);
    }

    upGrade(){
        console.log('upgrade');
        // this.props.upGrade(true);
        // axios.get('/test').then((res)=>{
            
        // })
    }

    render(){
        return(
            <div>
                <Button color="info" onClick={this.upGrade}>Upgrade</Button>
            </div>
        )
    }
}


// function mapStateToProps(state){
//     return{
//       auth : state.upgrade.auth
//     }
//   }
  
//   function mapDispatchToProps(Dispatch){
//     return{
//       upGrade : (auth)=> Dispatch({type: 'upgrade', payload:{auth}})
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Upgrade)

export default Upgrade;