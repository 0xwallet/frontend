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
                  {/* {
                      list.map((v,idx)=>{
                          return(
                            <div className="keysitem" key={idx}>
                            <ListGroupItem color="success" className="keysection">{v.name} 
                            </ListGroupItem>   
                            <div className="delete">
                              <Button color="danger" size="sm" onClick={
                                 ()=> deleteitem(v.id)
                              }>delete</Button>   
                            </div>
                            </div>
                          )
                      })
                  } */}
                    {
                        this.state.keys.map((v,idx)=>{
                            return(
                                <Input defaultValue={v} key={idx} type="text" disabled style={{marginBottom:'.5rem'}}/>
                                // <ListGroupItem color="success" className="keysection" key={idx}>{v} 
                                // </ListGroupItem>  
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
