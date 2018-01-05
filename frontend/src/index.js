// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import appReducers from './App/reducers';
import registerServiceWorker from './registerServiceWorker';

import type { Store } from './types';

const store: Store = createStore(
  appReducers,
  window.STATE_FROM_SERVER,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
