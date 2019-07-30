import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const store = configureStore()

const Main = (
  <Provider store={store}>
    <App/>
  </Provider>
)

ReactDOM.render(Main, document.getElementById('root'));
serviceWorker.unregister();
