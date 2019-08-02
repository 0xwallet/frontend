import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {browserHistory} from 'react-router'
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
// import {connect} from 'react-redux';
// import exampleAction from './store/actions'
// import { bindActionCreators } from 'redux';

require('./App.scss')

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

localStorage.setItem('theme','light');

var orignalSetItem = localStorage.setItem;

localStorage.setItem = function(key,newValue){
      var setItemEvent = new Event("setItemEvent");
      setItemEvent.newValue = newValue;
      window.dispatchEvent(setItemEvent);
      orignalSetItem.apply(this,arguments);
}
window.addEventListener("setItemEvent", function (e) {
    if(e.newValue === 'dark'){
      require('./Dark.scss');
    }else{
      window.location.reload();
    }
});

window.history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
        window.history.pushState(null, null, document.URL);
});

const enterTab = () => {
  console.log('进入路由做一些事情，嘿嘿嘿')
}
const leaveTab = () => {
  console.log('要离开路由了')
}

class App extends Component {
  render() { 
    return (
      <HashRouter history={browserHistory}>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} onEnter={enterTab.bind(this)} onLeave={leaveTab.bind(this)}/>
          {/* <Route exact path="/register" name="Register Page" component={Register} /> */}
          <Route exact path="/404" name="Page 404" component={Page404} />
          {/* <Route exact path="/500" name="Page 500" component={Page500} /> */}
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

// const mapStateToProps = ()=>{
//   return {
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     actions : bindActionCreators(exampleAction,dispatch)
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(App);
