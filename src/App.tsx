import React, { useState, useContext } from 'react'
import firebase from './config/firebase'
import { Context as ProjectContext } from './config/projectContext'
import { Context as AuthContext } from './config/authContext'

import Card from './components/Card'
import Navbar from './components/Navbar'
import LoginModal from './components/Modals/LoginModal'
import SubmitProposalModal from './components/Modals/SubmitProjectModal'
import Loader from './components/Loader'
import './styles/App.scss'

const App = () => {
  const [state, setState] = useState({ isLoginModalOpen: false })
  const { state: projects } = useContext(ProjectContext)
  const { state: auth } = useContext(AuthContext)
  const { loggedIn } = auth
  // componentDidMount () {
  //   // uncomment the line below if you are using data from your firebase database
  //   // loadProjects()
  //   this.checkLoggedInUser()
  // }

  // componentWillUnmount () {
  //   firebase.auth().signOut()
  // logInStateChange({ userUID: '', loggedIn: false })
  // }

  // const checkLoggedInUser = () => {
  //   const userInfoJSON = localStorage.getItem('userInfo')
  //   let userInfo
  //   if (userInfoJSON) {
  //     userInfo = JSON.parse(userInfoJSON)
  //   }
  //   if (userInfo && userInfo.loggedIn) {
  //     logInStateChange(userInfo)
  //   } else {
  //     logInStateChange({ userUID: '', loggedIn: false })
  //   }
  // }

  // const { home: { signInModalOpen, signOutModalOpen, submitProjectModalOpen, loggedIn }, projects } = this.props

  const toggleLoginModalOpen = () => {
    setState(state => ({ ...state, isLoginModalOpen: !state.isLoginModalOpen }))
  }

  const { isLoginModalOpen } = state
  if (projects && projects.length !== 0) {
    return (
      <div className="main">
        {/*
        // @ts-ignore */}
        <Navbar handleModalOpen={toggleLoginModalOpen} />
        <div className="max-height">
          <div className="landing-page-wrapper">
            <div>
              <p className="landing-page-text">Project Zed</p>
            </div>
            <p className="landing-page-subtext">
              Find projects done by Zambian Developers
            </p>
            <button
              // onClick={() => loggedIn ? toggleSubmitProjectModal() : toggleSignInModal()}
              className="btn btn-outline-info my-2 my-sm-0">
              Submit a project</button>
            <div className="arrow bounce">
              <a className="fa fa-arrow-down fa-2x down-arrow" href="#projects"><span></span></a>
            </div>
          </div>
        </div>
        <div id='projects'>
          {/*
          // @ts-ignore */}
          { projects.map((project, i) => <Card key={i} index={i} project={project} />) }
        </div>
        {/*
        // @ts-ignore */}
        {
          isLoginModalOpen
            ? <LoginModal
              handleModalClose={toggleLoginModalOpen}
              loggedIn={loggedIn} />
            : null
        }
        {/* <SignOutModal isOpen={signOutModalOpen} /> */}
        {/*
        // @ts-ignore */}
        {/* <SubmitProposalModal isOpen={submitProjectModalOpen} /> */}
      </div>
    )
  }
  return (
    <div className=" row justify-content-center align-items-center loader-wrapper">
      <Loader />
    </div>
  )
}

export default App
