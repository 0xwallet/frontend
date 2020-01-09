import gql from 'graphql-tag';

const GetOrgMemberList = gql`
query org($ID: String!){
  organization(id: $ID){
    users{
      username,
      avatar,
      role,
    }
  }
}`;

const GetChannelsMemberList = gql`
query channels($ID: String!){
  channel(id: $ID){
    users{
      username,
    },
    organization{
      name
    }
  }
}`;

const getChannlesIds = gql`
query channels{
  me{
    channels{
      id
    }
  }
}`;

const getOrgIds = gql`
query orgs{
  me{
    organizations{
      id
    }
  }
}`;

const queryKanban = gql`
query kanban($organizationId: ID!){
  kanbanColumns(organizationId: $organizationId){
    id,
    position,
  }
}`;

export { GetOrgMemberList, GetChannelsMemberList, getChannlesIds, getOrgIds, queryKanban };