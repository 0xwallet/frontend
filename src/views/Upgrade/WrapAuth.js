import React,{ Component } from 'react';
import { Button } from 'reactstrap'

export let WrapAuth = PayPage => class WrapComponent extends Component{
    render(){
        if(this.props.auth){
            return(
                <PayPage {...this.props}/>
            )
        }else{
            return(
            <div>
                <Button type="info">upgrade</Button>
            </div>)
        }
    }
}