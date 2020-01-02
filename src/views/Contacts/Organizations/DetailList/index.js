import React from 'react';
import {Card, CardHeader, CardBody, Button } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import data from './_data';

const table = data.rows;
const options = {
  sortIndicator: true,
  hideSizePerPage: true,
  paginationSize: 3,
  hidePageListOnlyOnePage: true,
  clearSearch: true,
  alwaysShowAllBtns: false,
  withFirstAndLast: false,
}
function Action() {
  return (
    <><Button color="danger" size="sm">删除</Button></>
  );
}
function DetailList() {
    return (
      <Card>
        <CardHeader>
          <i className="icon-menu"></i>成员列表
          <div className="card-header-actions">
            <Button color="success" size="sm">invite</Button>
          </div>
        </CardHeader>
        <CardBody>
          <BootstrapTable data={table} version="4" striped hover pagination search options={options}>
            <TableHeaderColumn dataField="avatar" dataFormat={(formatExtraData) => <img src={formatExtraData} alt="avatar" width="10%" />}>Avatar</TableHeaderColumn>
            <TableHeaderColumn isKey dataField="user" dataSort>User</TableHeaderColumn>
            <TableHeaderColumn dataField="role">Role</TableHeaderColumn>
            <TableHeaderColumn dataFormat={() => <Action />} width="15%">Action</TableHeaderColumn>
          </BootstrapTable>
        </CardBody>
      </Card>
    );
}

export default DetailList;