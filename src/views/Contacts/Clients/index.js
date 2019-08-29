import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
import { getNKNAddr, newNKNClient } from '../../../util/nkn3';

const HelloContext = React.createContext({
    theme: "DEFAULE",
})

const HelloContext2 = React.createContext({
    theme: "DEFAULEe",
})

export default class Client extends PureComponent{
    render() {
        return(
            <div>
                <NknChat/>
            </div>
        )
    }
}

class NknChat extends PureComponent{
    state = {
        username: "lcj",
        theme: "pink",
        font: "yuan"
    }

    tochatroom = () => {
        const { username } = this.state; 
        let nknClient = newNKNClient(username);

        nknClient.on("connect",()=>{
            this.nknClient = nknClient;
            this.nknClient.send(getNKNAddr("opop"), "hello opop").then(res=>{
                console.log(res)
            }).catch(e=>{
                console.log(e)
            });
        })

        nknClient.on('message', (src, payload, payloadType) => {
            let data = JSON.parse(payload);
            this.receiveMessage(data.chatID, data.message);
        });
        
    }

    toggleTheme = ()=>{
        this.setState({
            theme: "red"
        })
    }

    render(){
        let name = this.state.theme;
        let font = this.state.font;
        return(
            <div>
                <Button onClick={this.testarr}>ontest</Button>
                <HelloContext.Provider value={{
                    name,
                    changeTheme: this.toggleTheme
                }}>
                    <HelloContext2.Provider value={font}>
                        <Fa/>
                    </HelloContext2.Provider>
                </HelloContext.Provider>
            </div>
        )
    }
}

function Fa(){
    return(
        <div>
            <ToggleBtn />
        </div>
    )
}

class ToggleBtn extends React.Component {
    render() {
      return (
         <HelloContext.Consumer>
             {({name,changeTheme})=>(
                <HelloContext2.Consumer>
                    {
                        (font)=>(
                             <button onClick={changeTheme}>{name}{font}</button>
                        )
                    }
                </HelloContext2.Consumer>
             )}
         </HelloContext.Consumer>
      );
    }
  }
