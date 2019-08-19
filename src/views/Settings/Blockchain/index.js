import React,{ Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    user {
      accountType
    }
  }
`;

export default ()=>{
    return(
        <Fragment>
            <Query query={LAUNCHES_QUERY}>
          {
            ({ loading, error, data }) => {
              console.log(data,'datablackchina')
              return<div>hello world</div>
            }
          }
            </Query>
        </Fragment>
    )
}