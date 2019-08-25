import React, { PureComponent } from 'react';
import gql from "graphql-tag";
import { Form } from 'reactstrap';
import { Mutation } from "react-apollo";
import { GET_CURRENT_USER_QUERY } from "../../../components/CurrentUser";
import Loading from "../../../components/Loading";
import Email from './Email';
import Code from './Code';
import Logo from './Logo';
import Button from './Button';

import './index.scss';

const SIGNUP_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;
export default class Login0waf extends PureComponent{
    state = {
        username: "",
        email: "",
        password: "",
        openCodeInput: false
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleCompleted = data => {
        localStorage.setItem("auth-token", data.signup.token);
    
        this.props.history.push("/");
    };
    
    handleUpdate = (cache, { data }) => {
        cache.writeQuery({
            query: GET_CURRENT_USER_QUERY,
            data: { me: data.signup.user }
        });
    };

    openCodeInput = ()=>{
        this.setState({
            openCodeInput: !this.state.openCodeInput
        })
    }

    render() {
        const { openCodeInput: isOpen } = this.state;
        return (
                <Mutation
                mutation={SIGNUP_MUTATION}
                variables={this.state}
                onCompleted={this.handleCompleted}
                update={this.handleUpdate}>
                {(signup, { loading, error }) => {
                if (loading) return <Loading />;
                    return (
                        <div className="wrap">
                             <Form row="true" onSubmit={(null)} id="login">
                                <Logo />
                                <Email />
                                <Code isOpen={isOpen}/>
                                <Button openCodeInput={this.openCodeInput} isOpen={isOpen}/>
                                <div className="loginItem wenauthn">
                                    <span className="webauthn">WebAuthn</span>
                                </div>
                            </Form>
                        </div>
                       
                    );
                }}
            </Mutation>
        )
    }
}