import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import Client from 'shopify-buy';
import { Provider } from 'react-redux';
import store from './redux/store/index';

const client = Client.buildClient({
  storefrontAccessToken: 'cfd1ba648c32c5243a307171fe854bb8',
  domain: 'thesolandco.com'
});
store.dispatch({type: 'CLIENT_CREATED', payload: client});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);