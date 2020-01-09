import React from 'react';
import { Row, Col , FormGroup, Label, Input } from 'reactstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 

import './index.scss';

const LAUNCHES_QUERY = gql`
query me{
    me{
        avatar,
        email,
        username
    }
}
`;

function Dogs() {
    return (
            <div className="detail">
                <header className="title">Public info</header>
                <Query query={LAUNCHES_QUERY}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return 'Loading...';
                            if (error) return `Error! ${error.message}`;
                            const { username, email } = data.me;
                            const newtree = {
                                username,
                                email,
                            }
                            return (
                                Object.keys(newtree).map((v,i) => (
                                    <Row key={i}>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor={v}>{v}</Label>
                                                <Input type="text" id={v} placeholder="Enter your userName" required
                                                // disabled={!auth}
                                                defaultValue={newtree[v]}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                ))
                            );
                        }
                    }
                </Query>
                {/* <header className="title">Non-public info</header>
                {
                    Object.keys(newtreeprivate).map((v,i)=>{
                        return(
                            <Row key={i}>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor={v}>{v}</Label>
                                        <Input type="text" id={v} placeholder="Enter your userName" required
                                        disabled={!auth}
                                        defaultValue={newtreeprivate[v]}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        )
                    })
                } */}
            </div>
  )
}

export default Dogs;