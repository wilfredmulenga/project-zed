// @flow

import React, { Component } from 'react'
import firebase from './config/firebase'
import Card from './components/Card'
import Navbar from './components/Navbar'
import SignInModal from './components/modals/SignInModal'
import SignOutModal from './components/modals/SignOutModal'
import SubmitProposalModal from './components/modals/SubmitProjectModal'
import Loader from './components/Loader'

import { connect } from 'react-redux'
import {
  loadProjects,
  logInStateChange,
  toggleSubmitProjectModal,
  toggleSignInModal
} from './actions/actionCreators'
import { Dispatch, Project, Home } from './types/types'

import './App.scss'

type Props = {
  dispatch: Dispatch,
  projects: Array<Project>,
  home: Home
}

class App extends Component<Props> {
  componentDidMount () {
    // uncomment the line below if you are using data from your firebase database
    // this.props.dispatch(loadProjects())
    this.checkLoggedInUser()
  }

  componentWillUnmount () {
    firebase.auth().signOut()
    this.props.dispatch(logInStateChange({ userUID: null, userLoggedIn: false }))
  }

checkLoggedInUser = () => {
  const userInfoJSON = localStorage.getItem('userInfo')
  const userInfo = JSON.parse(userInfoJSON)
  if (userInfo && userInfo.loggedIn) {
    this.props.dispatch(logInStateChange(userInfo))
  } else {
    this.props.dispatch(logInStateChange({ userUID: null, loggedIn: false }))
  }
}

render () {
  const { home: { signInModalOpen, signOutModalOpen, submitProjectModalOpen, loggedIn }, projects } = this.props
  if (projects && projects.length !== 0) {
    return (
      <div style={{ backgroundColor: '#000' }}>
        <Navbar/>
        {/* landing page */}
        <div style={{ height: '100vh' }}>
          <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '70%', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: 60, color: '#FFF', float: 'center' }}>Project Zed</p>
            </div>
            <p style={{ fontSize: 40, color: '#FFF', float: 'center', marginLeft: '20px' }}>
              Find projects done by Zambian Developers
            </p>
            <button
              onClick={() => loggedIn ? this.props.dispatch(toggleSubmitProjectModal()) : this.props.dispatch(toggleSignInModal())}
              className="btn btn-outline-info my-2 my-sm-0">
              Submit a project</button>
            <div className="arrow bounce">
              <a className="fa fa-arrow-down fa-2x downArrow" href="#projects"><span></span></a>
            </div>
          </div>
        </div>
        <div id='projects'>
          { projects.map((project, i) => <Card key={i} index={i} project= {project} />) }
        </div>
        <SignInModal isOpen={signInModalOpen} />
        <SignOutModal isOpen={signOutModalOpen} />
        <SubmitProposalModal isOpen={submitProjectModalOpen} />
      </div>
    )
  }
  return (
    <div style={{ height: '100vh', backgroundColor: '#000' }}
      className=" row justify-content-center align-items-center">
      <Loader />
    </div>
  )
}
}

// this receives the state. it has a property 'projectsReducer' so we destructure here
function mapStateToProps ({ projectsReducer, homeReducer }) {
  return {
    projects: projectsReducer,
    home: homeReducer
  }
}

export default connect(mapStateToProps, null)(App)
