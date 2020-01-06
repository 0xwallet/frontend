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

export { queryChannels, getMeOrg };