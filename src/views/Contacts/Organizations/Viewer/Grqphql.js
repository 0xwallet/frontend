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
  mutation createOrganization($name: String!) {
    createOrganization(name: $name) {
      name,
      id,
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

const deleteOrgItem = gql`
  mutation delete($organizationId: ID!){
    deleteOrganization(organizationId: $organizationId){
      name,
      id,
    }
  }
`;

const deleteChannelItem = gql`
  mutation delete($channelId: ID!){
    deleteChannel(channelId: $channelId){
      name,
      id
    }
  }
`;

export { queryChannels, getMeOrg, CREATEORG_MUTATION, CreateChannel, deleteOrgItem, deleteChannelItem };