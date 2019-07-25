import React, { Component } from 'react';
import {  Card, CardBody, CardHeader } from 'reactstrap';

import ChatBody from './ChatBody';
import UserList from './UserList';

import './index.scss';

class Jumbotrons extends Component {
  constructor(){
      super();
      this.state = {
          username : "laoli",
      }
  }

  chatToPerson = (username)=>{
    this.setState({
        username
    })
  }

  render() {
    const listprops = {
        chatToPerson: this.chatToPerson
    }

    const bodyprops = {
        username: this.state.username
    }
    return (
      <div className="rootchat">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>chat</strong>
              </CardHeader>
              <CardBody>
                <div className="chat">
                    <UserList {...listprops}/>
                    <ChatBody {...bodyprops}/>
                </div>
              </CardBody>
            </Card>
      </div>
    );
  }
}

export default Jumbotrons;
