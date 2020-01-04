import React from 'react';
import {Card, CardHeader, CardBody, Button } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import table from './_data';

const { rows, channelMemberList } = table;
const options = {
  sortIndicator: true,
  hideSizePerPage: true,
  paginationSize: 3,
  hidePageListOnlyOnePage: true,
  clearSearch: true,
  alwaysShowAllBtns: false,
  withFirstAndLast: false,
}

const dataObject = {
  channels: channelMemberList,
  organization: rows,
}

function Action() {
  return (
    <><Button color="danger" size="sm">删除</Button></>
  );
}

function RenderTable({ name }) {
  if (name === "channels") {
    return (
      <BootstrapTable data={dataObject[name]} version="4" striped hover pagination search options={options}>
        <TableHeaderColumn dataField="avatar" dataFormat={(formatExtraData) => <img src={formatExtraData} alt="avatar" width="10%" />}>Avatar</TableHeaderColumn>
        <TableHeaderColumn isKey dataField="user" dataSort>User</TableHeaderColumn>
        <TableHeaderColumn dataField="organization">Organization</TableHeaderColumn>
        <TableHeaderColumn dataField="activity">Activity</TableHeaderColumn>
        <TableHeaderColumn dataField="income">Income</TableHeaderColumn>
      </BootstrapTable>
    );
  }
  if (name === "organization") {
    return (
      <BootstrapTable data={dataObject[name]} version="4" striped hover pagination search options={options}>
        <TableHeaderColumn dataField="avatar" dataFormat={(formatExtraData) => <img src={formatExtraData} alt="avatar" width="10%" />}>Avatar</TableHeaderColumn>
        <TableHeaderColumn isKey dataField="user" dataSort>User</TableHeaderColumn>
        <TableHeaderColumn dataField="role">Role</TableHeaderColumn>
        <TableHeaderColumn dataFormat={() => <Action />} width="15%">Action</TableHeaderColumn>
      </BootstrapTable>
    );
  }
  
  return <div>delay</div>
}
function DetailList({ memberFromName = "channels" }) {
    return (
      <Card>
        <CardHeader>
          <i className="icon-menu"></i>{memberFromName}{' '}member list
          <div className="card-header-actions">
            <Button color="success" size="sm">invite</Button>
          </div>
        </CardHeader>
        <CardBody>
          <RenderTable name={memberFromName}/>
        </CardBody>
      </Card>
    );
}

export default DetailList;