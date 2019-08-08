import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
require('./App.scss')

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
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
class App extends Component {

  render() { 
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route path="/" name="Home" component={DefaultLayout} />  
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
