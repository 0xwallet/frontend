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

/* class Viewer extends PureComponent{
    constructor(props){
        super(props);
        this.orgref = React.createRef();
    }

    state = {
        card4 : true,
        card3 : true,
        card2 : true,
        card1 : true,
        orgisopen : false,
        orgname: 'My organizations',
        orglist : ['0waf','github','bsvorg']
    }

    selorg = (_e,v) => {
       this.setState({
           orgname: v
       })
    }

    openisOrg = () => {
        this.orgref.current.toggle();
    }

    handleChangeId = () => {
        this.props.onChangeId();
    }

    handleChangeName = (_, memberListName) => {
        const { onChangeName } = this.props;
        onChangeName(memberListName);
    }

    render_card = () => {
        const { onChangeId } = this.props;
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
                                onChangeId={onChangeId} 
                                onClick={(e) => this.handleChangeName(e, v.id)}
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

    render(){
        const { onChangeId } = this.props;

        return(
            <>
                <CardHeader style={{display: 'flex',alignItems: 'center'}}>    
                <ButtonGroup >
                <Query
                    query={getMeOrg}
                >
                    {
                        ({ data, loading, error}) => {
                            if (loading) return 'loading';
                            if (error) return 'error';
                            const { me: { organizations } } = data;
                            return (
                            <Dropdown 
                                id='org' 
                                isOpen={this.state.orgisopen} 
                                toggle={() => { this.setState({ orgisopen: !this.state.orgisopen })}}
                            >
                                <DropdownToggle caret className="p-0" color="#000">
                                    <i className="icon-equalizer"></i>{'  '}
                                    {this.state.orgname}{' '} 
                                </DropdownToggle>
                                <DropdownMenu left="true" style={{height: "300px", overflow: 'auto'}}>
                                {
                                    organizations && organizations.map((v,i)=>{
                                        return(
                                        <DropdownItem onClick={(e)=>{
                                            this.selorg(e,v.name)
                                        }} key={i}>{v.name}</DropdownItem> 
                                        )
                                    })
                                }
                                </DropdownMenu>
                            </Dropdown>);
                        }
                    }
                </Query>
                </ButtonGroup>
                <span style={{color:'#20a8d8',marginLeft:'1rem',cursor:'pointer'}} onClick={this.openisOrg}>create</span>
                </CardHeader>
                    <Row>
                        {this.render_card()} 
                        <Col xs="12" sm="6" lg="3">  
                            <OrgCard icon="fa fa-laptop" color="info" header="99999.99" value="50" id="income" onClick={(e) => this.handleChangeName(e, "income")}>Income</OrgCard>
                        </Col>
                        <Col xs={12} sm={6} md={3} >
                             <Query query={queryChannels}>
                                 {
                                     ({ data, loading, error}) => {
                                        if (loading) return 'loading';
                                        if (error) return 'error';
                                        const { me: { channels } } = data;
                                        return (
                                            <OrgCard 
                                                icon="fa fa-podcast"
                                                color="info"
                                                header="33333"
                                                value="25" 
                                                id="channels" 
                                                list={channels}
                                                onChangeId={onChangeId} 
                                                onClick={(e) => this.handleChangeName(e, "channels")}
                                            >
                                                Users
                                            </OrgCard>                           
                                        );
                                     }
                                 }
                             </Query>
                         </Col>
                         <Col xs="12" sm="6" lg="3">
                            <Query query={getMeOrg}>
                                {
                                    ({ data, loading, error}) => {
                                        if (loading) return 'loading';
                                        if (error) return 'error';
                                        const { me: { organizations } } = data;
                                        return(
                                            <OrgCard 
                                                icon="icon-people" 
                                                color="info" 
                                                header="55555" 
                                                value="25" 
                                                id="organizations" 
                                                list={organizations} 
                                                onChangeId={onChangeId} 
                                                onClick={(e) => this.handleChangeName(e, "organizations")}
                                            >
                                                Members
                                            </OrgCard>
                                        );
                                    }
                                }
                            </Query>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <OrgCard icon="icon-pie-chart" color="info" header="87.500" value="25" id="tasks" onClick={(e) => this.handleChangeName(e, "task")}>Statistics</OrgCard>
                        </Col>
                    </Row>
                <CreateOrgModal ref={this.orgref}/>
            </>
        )
    }
}*/

function Render_Card(onChangeId, handleChangeName) {
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
                            onChangeId={onChangeId} 
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
             {Render_Card(onChangeId, handleChangeName)}
        </Row>
    );
}

export default Viewer;