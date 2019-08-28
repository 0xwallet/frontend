import React,{ PureComponent } from 'react';
import { Input } from 'reactstrap';
import generateMessage from '../../../../util/nkn'
import './index.scss';

export default class ChatBrower extends PureComponent{
    constructor(){
        super();
        this.state = {
            msgArr: [],
            inputValue: ""
        }
    }

    sendMsg = (e)=>{
        const { msgArr } = this.state;
        const cloneArr = [...msgArr];
        if(e.keyCode === 13){
            cloneArr.push({
                detail: e.target.value,
                id: Date.now()
            })
            this.setState({
                msgArr: cloneArr,
                inputValue: ""
            })
            generateMessage(e.target.value)
        }        
    }


    onChangeValue = (e)=>{
        this.setState({
            inputValue: e.target.value
        })
    }

    render(){
        const { id } = this.props;
        const { msgArr, inputValue } = this.state;
        return(
            <div className="chatclient" style={{height:"80vh"}}>
                <h1>Chat Client___{id}</h1>
                <div className="chatSection">
                    {
                        msgArr.map((v,i)=>{
                            const id = v.id;
                            return(
                                <div key={id}>
                                    {/* <Input defaultValue={v.detail} /> */}
                                    <div>{v.detail}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{margin:"1rem 0"}}>
                    <Input onKeyDown={this.sendMsg} onChange={this.onChangeValue} value={inputValue} />
                </div>
            </div>
        )
    }
}