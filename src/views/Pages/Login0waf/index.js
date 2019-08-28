import React, { PureComponent } from 'react';
import gql from "graphql-tag";
import { Form } from 'reactstrap';
import { Mutation } from "react-apollo";
import { GET_CURRENT_USER_QUERY } from "../../../components/CurrentUser";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import Email from './Email';
import Code from './Code';
import Logo from './Logo';
import ButtonCom from './Button';

import './index.scss';

const SIGNIN_MUTATION = gql`
  mutation SignIn($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;
export default class Login0waf extends PureComponent{
    state = {
        // username: "",
        email: "",
        password: "",
        openCodeInput: false
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleCompleted = data => {
        console.log(data,'data')
        localStorage.setItem("auth-token", data.signin.token);
        localStorage.setItem("username", data.signin.user.username);        
        // this.props.history.push("/");
    };
    
    handleUpdate = (cache, { data }) => {
        cache.writeQuery({
            query: GET_CURRENT_USER_QUERY,
            data: { me: data.signin.user }
        });
    };

    openCodeInput = ()=>{
        this.setState({
            openCodeInput: !this.state.openCodeInput
        })
    }

    // sendCode 
    sendCode = ()=>{
        const { email } = this.state;
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
        if(email === ""){
            console.log("null")
        }
        if(email !== "" && !reg.test(email)){
            console.log('format')
        }
        if(email !== "" && reg.test(email)){
            console.log('correct');
            this.openCodeInput()
        }
    }

    render() {
        const { openCodeInput: isOpen, email:username, password } = this.state;
        return (
                <Mutation
                mutation={SIGNIN_MUTATION}
                variables={{
                    username,
                    password
                }}
                onCompleted={this.handleCompleted}
                update={this.handleUpdate}>
                {(signin, { loading, error }) => {
                if (loading) return <Loading />;
                    return (
                        <div className="wrap">
                             <Form row="true" onSubmit={(e)=>{
                                 e.preventDefault();
                             }} id="login">
                                <Logo />
                                <Email onChangeEmailValue={this.handleChange}/>
                                <Code isOpen={isOpen} onChangeCodeValue={this.handleChange}/>
                                <Error error={error} />
                                <ButtonCom sendCode={this.sendCode} isOpen={isOpen} signin={signin}/>
                                <div className="loginItem wenauthn">
                                    <span className="webauthn">WebAuthn</span>
                                    {/* <span className="webauthn">Need an account?</span> */}
                                </div>
                            </Form>
                        </div>
                       
                    );
                }}
            </Mutation>
        )
    }
}