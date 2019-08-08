import React ,{useState}from 'react';
import {Card,CardHeader,CardBody,Button,ListGroupItem} from 'reactstrap';
import Locking from '../components/Locking';
export default (props)=>{
    const [list,setlist] = useState([]);
    const {auth = false} = props;
    function deleteitem(id){
        const index = list.findIndex(v=>v.id === id);
        const newlist = [...list];
        newlist.splice(index,1);
        setlist(newlist)
    }
    return(
        <Card className="keys">
        <CardHeader>Backup
        <div className="card-header-actions">
            <Locking onAuth={props.onAuth} auth={auth}/>
        </div>
        </CardHeader>
        <CardBody>
            <div className="keysbtn"> 
                  {
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
                  }
                <Button color="primary" className="add" onClick={()=>setlist([...list,{name:`laoli${Date.now()}`,id:Date.now()}])} disabled={auth?false:true}>Add a key</Button>
            </div>
        </CardBody>
        </Card>
    )
}