import React,{ PureComponent } from 'react';
import { Input } from 'reactstrap';
// import generateMessage from '../../../../util/nkn';
import './index.scss';

export default class ChatBrower extends PureComponent{
    constructor(){
        super();
        this.state = {
            msgArr: [],
            inputValue: "",
            socket: new WebSocket("ws://localhost:8080/ws")
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

            this.sendToServer(e.target.value);
            
            // generateMessage(e.target.value)
        }        
    }



    onChangeValue = (e)=>{
        this.setState({
            inputValue: e.target.value
        })
    }

    sendToServer = (message) => {
        const { socket } = this.state;
        if (!window.WebSocket) {
            return;
        }
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        } else {
            alert("连接没有开启.");
        }
    }

    componentDidMount(){
        const { socket } = this.state;
        socket.onmessage = function (event) {
            // console.log(event,'event')
            var ta = document.getElementById('responseText');
            ta.value = ta.value + '\n' + event.data
        };
        socket.onopen = function (event) {
            var ta = document.getElementById('responseText');
            ta.value = "连接开启!";
        };
        socket.onclose = function (event) {
            var ta = document.getElementById('responseText');
            ta.value = ta.value + "连接被关闭";
        };
    }

    render(){
        // const { id } = this.props;
        const { msgArr, inputValue } = this.state;
        return(
            <div className="chatclient" style={{height:"80vh"}}>
                {/* <h1>Chat Client___{id}</h1> */}
                <div className="chatSection">
                    {
                        // msgArr.map((v,i)=>{
                        //     const id = v.id;
                        //     return(
                        //         <div key={id}>
                        //             {/* <Input defaultValue={v.detail} /> */}
                        //             <div>{v.detail}</div>
                        //         </div>
                        //     )
                        // })
                    }
                </div>
                <textarea id="responseText" style={{width: '500px', height: '300px'}}></textarea>
                <div style={{margin:"1rem 0"}}>
                    <Input onKeyDown={this.sendMsg} onChange={this.onChangeValue} value={inputValue} />
                </div>
            </div>
        )
    }
}