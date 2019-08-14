import React,{PureComponent} from 'react';
import { AppSwitch } from '@coreui/react';

export default class Locking extends PureComponent{
   canEdit = ()=>{
        this.props.onAuth();
        if(this.props.auth === true){
          this.props.onVerify();
        }
   }
   render(){
       return(
            <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} size={'sm'}  onClick={this.canEdit} />
       )
   }
}


