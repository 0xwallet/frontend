import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Login'),
  loading
});

// const Register = Loadable({
//   loader: () => import('./views/Pages/Register'),
//   loading
// });

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

// const Page500 = Loadable({
//   loader: () => import('./views/Pages/Page500'),
//   loading
// });

class App extends Component {

  render() { 
    const theme = localStorage.getItem('theme');// this.props.theme
    if(theme === 'dark'){
      require('./Dark.scss');
    }
    if(theme === 'light'){
      require('./App.scss');
    }

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          {/* <Route exact path="/register" name="Register Page" component={Register} /> */}
          <Route exact path="/404" name="Page 404" component={Page404} />
          {/* <Route exact path="/500" name="Page 500" component={Page500} /> */}
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

function mapStateToProps(state){
  return{
    theme : state.updatetheme.theme
  }
};

export default connect(mapStateToProps)(App);
