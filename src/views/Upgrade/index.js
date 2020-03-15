import React,{ PureComponent } from 'react';
import { Button } from 'reactstrap';

class Upgrade extends PureComponent{
    constructor(){
        super();
        this.upGrade = this.upGrade.bind(this);
    }

    upGrade(){
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

export default Upgrade;