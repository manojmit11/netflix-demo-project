import React from 'react';
import ReactDOM from 'react-dom';
import NetflixDemo from './components/NetflixDemo';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <NetflixDemo />
  </Provider>,
  document.getElementById('root')
);
