import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ProjectProvider } from './config/projectContext'
import { Provider as AuthProvider } from './config/authContext'
import App from './App.tsx'
import * as serviceWorker from './serviceWorker'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Main = (
  <ProjectProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ProjectProvider>
)

ReactDOM.render(Main, document.getElementById('root'))
serviceWorker.unregister()
