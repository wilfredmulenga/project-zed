import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './config/context'
import App from './App.tsx'
import * as serviceWorker from './serviceWorker'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Main = (
  <Provider>
    <App />
  </Provider>
)

ReactDOM.render(Main, document.getElementById('root'))
serviceWorker.unregister()
