import React ,{PureComponent}from 'react';
import {Card,CardHeader,CardBody,Button,Input} from 'reactstrap';// ListGroupItem
import Locking from '../components/Locking';
import './index.scss';

export default class Keys extends PureComponent{
    state = {
        keys: []
    }
    componentDidMount(){
        this.props.getkeyslist().then(res=>{
            this.setState({
                keys: res
            })
        })
    }
    render(){
        const {auth = false,addkeys,onAuth} =this.props;
        return(
            <Card className="keys">
        <CardHeader>Keys
        <div className="card-header-actions">
            <Locking onAuth={onAuth} auth={auth}/>
        </div>
        </CardHeader>
        <CardBody>
            <div className="keysbtn"> 
                    {
                        this.state.keys.map((v,idx)=>{
                            return(
                               <div key={idx} style={{display: 'flex',alignItems: 'center',marginBottom:'.5rem',justifyContent:'space-between'}}>
                                    <Input defaultValue={v} type="text" disabled style={{width:'97%'}}/> 
                                    <i className="fa fa-close"></i>
                               </div>
                            )
                        })
                    }
                <Button color="primary" className="add" onClick={addkeys} disabled={auth?false:true}>Add a key</Button>
            </div>
        </CardBody>
        </Card>
        )   
    }
}
