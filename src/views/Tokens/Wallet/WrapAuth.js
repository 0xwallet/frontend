import React from 'react';
// import { Button } from 'reactstrap';
// import { connect } from 'react-redux';

// function mapStateToProps(state){
//     return{
//         auth : state.upgrade.auth
//     }
// }

function HOCFactoryFactory(info){
    // return function HOCFactory(WrappedComponent){
    //     return connect(mapStateToProps)(class HOC extends Component{
    //         constructor(){
    //             super();
    //             this.upGrade = this.upGrade.bind(this);
    //         }
        
    //         upGrade(){
    //             this.props.history.push('/upgrade')
    //         }
        
    //         render(){
    //             return this.props.auth?
    //             <WrappedComponent >
    //                     <p>you have auth</p>
    //             </WrappedComponent> : <WrappedComponent>
    //                 <p>you should upgrade
    //                     <Button color="info" onClick={this.upGrade}>upGrade</Button>
    //                 </p>
    //             </WrappedComponent>
    //         }
    //     })
    // }

    return(
        <div>HOCFactoryFactory</div>
    )
}

export default HOCFactoryFactory;