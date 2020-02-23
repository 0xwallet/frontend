import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
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
// import gql from 'graphql-tag';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
// import client from '../../client';
const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

export const { Provider, Consumer } = React.createContext();

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    // this.props.history.push('/dashboard');
  }
  state = {
    currentChannel: "",
    // channels: [{id: 123,user: "New Tab"}],
    channels: [{id: 123,user: "New Tab"}]
  }

  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  // mutation channels
  addChannels = ()=>{
    const cloneChannels = [...this.state.channels];
    cloneChannels.push({
      id: Date.now(),
      user: 'New Tab'
    });
    this.setState({
      channels: cloneChannels
    })
  }

  closeChannels = (id) => {
    const cloneChannels = [...this.state.channels];
    const index = cloneChannels.findIndex(v=>v.id === id);
    cloneChannels.splice(index,1);
    this.setState({
        channels: cloneChannels
    })    
  }

      
  connectChannel = (channelName,id)=>{
    console.log(channelName,'chanelename')
    const cloneChannels = [...this.state.channels];
    cloneChannels[id].user = channelName;
    this.setState({
      channels: cloneChannels,
      currentChannel: channelName
    });
  }

  connectHaveChannel = (channelName) => {
    const cloneChannels = [...this.state.channels];
    if(this.state.currentChannel !== channelName){
      cloneChannels.push({
        id: Date.now(),
        user: channelName
      });
      this.setState({
        channels: cloneChannels,
        currentChannel: channelName
      });
    }
  }

  componentDidMount() {
    // client.query({  
    //   query: getBooks
    // }).then(({data: { places }})=>{
    //   let arr = [];
    //   places.forEach((v,i)=>{
    //     arr.push({
    //       id: i,
    //       user: v.name
    //     })
    //   });

    //    this.setState({
    //       channels: arr
    //    })
    // });
    // this.props.history.push('/dashboard');
    this.setState({
      channels: [{
        id: 1,
        user: 'OWAF'
      }]
   })
  }

  render() {
    const { channels, currentChannel } = this.state;
    return (
      <Provider value={{ 
        channels,
        addChannels: this.addChannels,
        closeChannels: this.closeChannels,
        connectChannel: this.connectChannel,
        connectHaveChannel: this.connectHaveChannel,
        currentChannel
        }}>
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
                  {/* <Fragment>
                      <Query query={LAUNCHES_QUERY}>
                          {
                            ({ loading, error, data }) => {
                                if(!loading){
                                  data.user.accountType === 'basic'? navigation.items.splice(20,1): navigation.items.splice(19,1)
                                }
                                return <AppSidebarNav navConfig={navigation} {...this.props} />
                            }
                          }
                      </Query>
                  </Fragment> */}
                      <AppSidebarNav navConfig={navigation} {...this.props} />
                  </Suspense>
                  <AppSidebarFooter />
                  <AppSidebarMinimizer />
                </AppSidebar>
                <main className="main" style={{
                  position: "relative"
                }}>
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
            </Provider>
    );
  }
}

export default withRouter(DefaultLayout);