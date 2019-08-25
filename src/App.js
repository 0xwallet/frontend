import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

const Home = Loadable({
  loader: () => import('./components/Home'),
  loading
});

// Pages

// const Register = Loadable({
//   loader: () => import('./views/Pages/Register'),
//   loading
// });

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const SignIn = Loadable({
  loader: () => import('./views/Pages/SignIn'),
  loading
})

const Signup = Loadable({
  loader: () => import('./views/Pages/Signup'),
  loading
})

// const Page500 = Loadable({
//   loader: () => import('./views/Pages/Page500'),
//   loading
// });

// localStorage.setItem('theme','light');
// localStorage.setItem('ReceivedMsg',JSON.stringify([]));
// localStorage.setItem('sendMsg',JSON.stringify([]));

// var orignalSetItem = localStorage.setItem;

// localStorage.setItem = function(key,newValue){
//       var setItemEvent = new Event("setItemEvent");
//       setItemEvent.newValue = newValue;
//       window.dispatchEvent(setItemEvent);
//       orignalSetItem.apply(this,arguments);
// }
// window.addEventListener("setItemEvent", function (e) {
//     if(e.newValue === 'dark'){
//       require('./Dark.scss');
//     }else{
//       window.location.reload();
//     }
// });

// window.history.pushState(null, null, document.URL);
// window.addEventListener('popstate', function () {
//         window.history.pushState(null, null, document.URL);
// });
class App extends Component {
  render() { 
    return (
      <BrowserRouter>
          <div id="app">
               <div id="connect">
                  <Switch>
                      <Route exact path="/sign-in" name="Login Page" component={SignIn} />
                      <Route exact path="/sign-up" name="Login Page" component={Signup} />
                      <Route exact path="/404" name="Page 404" component={Page404} />
                      <Route path="/" name="Home" component={Home} />
                  </Switch>
               </div>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
