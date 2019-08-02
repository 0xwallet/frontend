import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';

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

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(){
    super();
    this.logout = this.logout.bind(this);
    this.upgrade = this.upgrade.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  logout(){
    localStorage.clear();
    this.props.tologin(false);
    this.props.history.push('/login')
  }

  upgrade(){
    this.props.history.push('/upgrade')
  }

  render() {
    return (
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
              <AppSidebarNav navConfig={navigation} {...this.props} />
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
                  {/* {
                    localStorage.getItem('token')?
                    axios.get('http://161.117.83.227/v2api/verify_token',{
      params: {
        token:localStorage.getItem('token')
      }
    }).then(({data})=>{
      if(data.r === 'token invalid'){
       return <Redirect from="/" to="/login"/>
      }else{
        return <Redirect from="/" to="/dashboard"/>
      }
    }):<Redirect from="/" to="/login"/>
                  } */}
                  {/* <Redirect from="/" to="/dashboard" /> */}
                  {/* <Redirect from="/" to="/dashboard" /> */}
                  {/* <Redirect from="/" to="/login" /> */}
                  {/* {
                    sessionStorage.getItem('user') ?
                    <Redirect from="/" to="/dashboard" /> :
                    <Redirect from="/" to="/login" />
                  } */}
                  {
                     <Redirect from="/" to="/login" />
                  }
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
    );
  }
}

function mapStateToProps(state){
  return {
    tologin : state.login.tologin,
  }
}

function mapDispatchToProps(dispatch){
  return {
    tologin : (info)=> dispatch({type: 'login',payload : {info}})
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(DefaultLayout);
