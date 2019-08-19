import React, { Component, Suspense,Fragment } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { Container } from 'reactstrap';
import {connect} from 'react-redux';
import exampleAction from '../../store/actions/index';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import Login from '../../views/Login';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    user {
      accountType,
    }
  }
`;

class DefaultLayout extends Component {
  constructor(){
    super();
    this.logout = this.logout.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.state = {
      token: localStorage.getItem('token')
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  logout(){
    this.props.actions.logout(this.state.token)    
  }

  login = ()=>{
    this.props.actions.rootlogin()
  }

  upgrade(){
    this.props.history.push('/upgrade')
  }

  componentDidMount(){
    this.props.actions.vefifytoken(this.state.token)
  }
  

  render() {
    return (
      this.props.islogin ? 
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader logout={this.logout} upgrade={this.upgrade}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <Fragment>
                <Query query={LAUNCHES_QUERY}>
                    {
                      ({ loading, error, data }) => {
                          if(data.user){
                            data.user.accountType === 'basic'? navigation.items.splice(20,1): navigation.items.splice(19,1)
                          }
                          return <AppSidebarNav navConfig={navigation} {...this.props} />
                      }
                    }
                </Query>
            </Fragment>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                   <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    : (
      <Login login={this.login}/>
    ));
  }
}

const mapStateToProps = (state)=>{
  return {
    islogin: state.webauthnlogin.webauthnlogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(exampleAction,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DefaultLayout);