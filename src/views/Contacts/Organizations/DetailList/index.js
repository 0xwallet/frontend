import React from 'react';
import {Card, CardHeader, CardBody, Button } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Query } from "react-apollo";
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { GetOrgMemberList, GetChannelsMemberList, getChannlesIds, getOrgIds } from '../Graphql';

const options = {
  sortIndicator: true,
  hideSizePerPage: true,
  paginationSize: 3,
  hidePageListOnlyOnePage: true,
  clearSearch: true,
  alwaysShowAllBtns: false,
  withFirstAndLast: false,
}

const queryObject = {
  organizations: GetOrgMemberList,
  channels: GetChannelsMemberList,
  // delay
  tasks: getOrgIds,
  income: getChannlesIds,
}

// const defaultIdObj = {
//   organizations: getOrgIds,
//   channels: getChannlesIds,
//   // delay
//   tasks: getOrgIds,
//   income: getChannlesIds,
// }

function Action() {
  return (
    <><Button color="danger" size="sm">删除</Button></>
  );
}

function RenderTable({ name, id }) {
  // let defaultId = "1";
  // // delay
  // if (name === 'tasks') return "";
  // if (name === 'income') return "";

  // const { data: idData } = useQuery(defaultIdObj[name]);
  // if (idData && idData.me[name].length !== 0) defaultId = idData.me[name][0].id;

  // const { loading, error, data } = useQuery(queryObject[name], {
  //   variables: {
  //     ID: id || defaultId,
  //   }
  // });

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  if (name === "channels") {
    return (
      <Query query={queryObject[name]} variables={{
        ID: id,
      }} skip={!id}>
        {
          ({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            if (!data) return 'no data';
            const users = data.channel.users;
            const organizationName = data.channel.organization.name;
            users.forEach((v) => {
              v.organization = organizationName;
            });
            return (
              <BootstrapTable data={users} version="4" striped hover pagination search options={options}>
                <TableHeaderColumn dataField="avatar" dataFormat={(formatExtraData) => <img src={formatExtraData} alt="avatar" width="10%" />}>Avatar</TableHeaderColumn>
                <TableHeaderColumn isKey dataField="username" dataSort>User</TableHeaderColumn>
                <TableHeaderColumn dataField="organization">Organization</TableHeaderColumn>
                <TableHeaderColumn dataField="activity">Activity</TableHeaderColumn>
                <TableHeaderColumn dataField="income">Income</TableHeaderColumn>
              </BootstrapTable>
            );
          }
        }
      </Query>
    );
  }
  if (name === "organizations") {
    return (
      <Query query={queryObject[name]} variables={{
        ID: id,
      }} skip={!id}>
        {
          ({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            if (!data) return 'no data';

            const users = data.organization.users;
            return (
              <BootstrapTable data={users} version="4" striped hover pagination search options={options}>
                <TableHeaderColumn dataField="avatar" dataFormat={(formatExtraData) => <img src={formatExtraData} alt="avatar" width="10%" />}>Avatar</TableHeaderColumn>
                <TableHeaderColumn isKey dataField="username" dataSort>User</TableHeaderColumn>
                <TableHeaderColumn dataField="role">Role</TableHeaderColumn>
                <TableHeaderColumn dataFormat={() => <Action />} width="15%">Action</TableHeaderColumn>
              </BootstrapTable>
            );
          }
        }
      </Query>
    );
  }
  
  return <div>delay</div>
}
function DetailList({ memberFromName = "channels", id }) {
    return (
      <Card>
        <CardHeader>
          <i className="icon-menu"></i>{memberFromName}{' '}member list
          <div className="card-header-actions">
            <Button color="success" size="sm">invite</Button>
          </div>
        </CardHeader>
        <CardBody>
          <RenderTable name={memberFromName} id={id} />
        </CardBody>
      </Card>
    );
}

export default DetailList;