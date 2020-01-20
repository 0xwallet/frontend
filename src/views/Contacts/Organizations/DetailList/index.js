import React from 'react';
import {Card, CardHeader, CardBody, Button } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Query } from "react-apollo";
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { GetOrgMemberList, GetChannelsMemberList, getChannlesIds, getOrgIds } from '../Graphql';

const bar = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16],
  datasets: [
    {
      label: 'Recharge',
      backgroundColor: '#2db7f5',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [12, 23, 33, 42, 15, 36, 7, 18, 19, 10, 11, 12, 13, 15, 16],
    },
    {
      label: 'Reflect',
      backgroundColor: '#87d068',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [11, 42, 3, 14, 15, 16, 7, 28, 9, 10, 11, 12, 23, 15, 16],
    },
    {
      label: 'Transfer',
      backgroundColor: '#108ee9',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [11, 22, 13, 42, 15, 61, 17, 18, 19, 10, 11, 12, 13, 35, 46],
    },
  ],
};

const chartOptions = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

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
  if (name === 'income') {
    return (
      <Card>
        <CardHeader>
          BALANCE LOGS
          <div className="card-header-actions">
            <a href="http://www.chartjs.org" className="card-header-action">
              <small className="text-muted">docs</small>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <div className="chart-wrapper">
            <Bar data={bar} options={chartOptions} />
          </div>
        </CardBody>
      </Card>
    );
  }
  if (name === "channels") {
    return (
      <Query query={queryObject[name]} variables={{
        ID: id,
      }} skip={!id}>
        {
          ({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            if (!data) return 'DATA NOT FOUND';
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