import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import ApolloClient from 'apollo-boost';
import './index.css';

import rootReducer from './store/reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
});



let store = createStore(rootReducer,applyMiddleware(thunk,promise));

ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </Provider>,document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
