import React,{ PureComponent } from 'react';
import HOCFactoryFactory from './WrapAuth';

const auth = false;
class Wallet extends PureComponent{
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default HOCFactoryFactory(auth)(Wallet);





