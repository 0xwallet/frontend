import gql from 'graphql-tag';

const GetChannelMemberList = gql`
query GetChannelMemberList {
    me {
      channels{
        users{
          username
        }
      }
    }
}`;

const GetChannelMemberList = gql`
query GetChannelMemberList {
    me {
      channels{
        users{
          username
        }
      }
    }
}`;

export { GetChannelMemberList };