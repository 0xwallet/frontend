import React from 'react';
import { /* Card, CardBody, CardHeader ,*/Row,Col, /* ButtonGroup,Dropdown,DropdownToggle, DropdownItem, DropdownMenu */ } from 'reactstrap';
import { Query } from 'react-apollo';
import OrgCard from './OrgCard';
// import CreateOrgModal from './CreateOrgModal';
import { getMeOrg, queryChannels } from './Grqphql';
// import {generateMessage} from './nkn';

const cardConfig = {
    income: {
        description: "Members",
        query: getMeOrg,
        icon: "fa fa-laptop", color: "info", header: "99999.99", value: "50", id: "income"
    },
    channels: {
        icon: "fa fa-podcast",
        color: "info",
        header: "33333",
        value: "25",
        description: "Members",
        query: queryChannels,
        id: "channels"
    },
    organizations: {
        icon: "icon-people",
        color:"info",
        header: "55555",
        value: "25",
        id: "organizations",
        description: "Members",
        query: getMeOrg,
    },
    tasks: {
        description: "Members",
        query: getMeOrg,
        icon:"icon-pie-chart", color: "info", header: "87.500", value: "25", id: "tasks"
    }
};

function RenderCard({ handleChangeId, handleChangeName }) {
    return (
       Object.values(cardConfig).map((v, i) => (
        <Col xs={12} sm={6} md={3} key={i}>
            <Query query={v.query}>
                {
                    ({ data, loading, error}) => {
                    if (loading) return 'loading';
                    if (error) return 'error';
                    const { me } = data;
                    return (
                        <OrgCard 
                            {...v}
                            list={me[v.id]}
                            id={v.id} 
                            onChangeId={handleChangeId} 
                            onClick={(e) => handleChangeName(e, v.id)}
                        >
                            {v.description}
                        </OrgCard>                           
                    );
                    }
                }
            </Query>
        </Col>
       ))
    );
}

function Viewer(props) {
    const {onChangeId, onChangeName } = props;
    const handleChangeName = (_, memberListName) => {
        onChangeName(memberListName);
    }
    
    return (
        <Row>
            <RenderCard handleChangeId={onChangeId} handleChangeName={handleChangeName} />
        </Row>
    );
}

export default Viewer;