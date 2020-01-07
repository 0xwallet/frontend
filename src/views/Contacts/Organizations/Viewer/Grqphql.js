import gql from 'graphql-tag';

const queryChannels = gql`
query GetChannels {
    me {
      channels{
        name,
        id
      }
    }
}`;

const getMeOrg = gql`
    query GetOrganizations {
        me {
            organizations{
                name,
                id,
            }
        }
    }
`;

const CREATEORG_MUTATION = gql`
  mutation createOrg($name: String!) {
    createOrganization(name: $name) {
      name,
    }
  }
`;

const CreateChannel = gql`
  mutation createChannles($name: String!, $organizationId: ID!, $type: String!){
    createChannel(name: $name, organizationId: $organizationId, type: $type) {
      id, 
      name
    }
  }
`;

export { queryChannels, getMeOrg, CREATEORG_MUTATION, CreateChannel };