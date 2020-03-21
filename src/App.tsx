import React from 'react'
import firebase from './config/firebase'
import { connect } from 'react-redux'

import Card from './components/Card'
import Navbar from './components/Navbar'
import SignInModal from './components/Modals/SignInModal'
import SignOutModal from './components/Modals/SignOutModal'
import SubmitProposalModal from './components/Modals/SubmitProjectModal'
import Loader from './components/Loader'
import {
  loadProjects,
  logInStateChange,
  toggleSubmitProjectModal,
  toggleSignInModal
} from './actions/actionCreators'
import { Project } from './types/types'
import './styles/App.scss'

type Props = {
  home: {
    signInModalOpen: boolean,
     signOutModalOpen: boolean,
      submitProjectModalOpen: boolean,
    loggedIn: boolean 
  },
  projects: Project[]
}

class App extends React.Component<Props> {
  componentDidMount () {
    // uncomment the line below if you are using data from your firebase database
    loadProjects()
    this.checkLoggedInUser()
  }

  componentWillUnmount () {
    firebase.auth().signOut()
  logInStateChange({ userUID: '', loggedIn: false })
  }

checkLoggedInUser = () => {
  const userInfoJSON = localStorage.getItem('userInfo')
  let userInfo
  if(userInfoJSON) {
  userInfo = JSON.parse(userInfoJSON)
  }
  if (userInfo && userInfo.loggedIn) {
   logInStateChange(userInfo)
  } else {
    logInStateChange({ userUID: '', loggedIn: false })
  }
}

render () {
  const { home: { signInModalOpen, signOutModalOpen, submitProjectModalOpen, loggedIn }, projects } = this.props
  console.log('here', projects)
  if (projects && projects.length !== 0) {
    return (
      <div className="main">
        //@ts-ignore
        <Navbar/>
        <div className="max-height">
          <div className="landing-page-wrapper">
            <div>
              <p className="landing-page-text">Project Zed</p>
            </div>
            <p className="landing-page-subtext">
              Find projects done by Zambian Developers
            </p>
            <button
              onClick={() => loggedIn ? toggleSubmitProjectModal() : toggleSignInModal()}
              className="btn btn-outline-info my-2 my-sm-0">
              Submit a project</button>
            <div className="arrow bounce">
              <a className="fa fa-arrow-down fa-2x down-arrow" href="#projects"><span></span></a>
            </div>
          </div>
        </div>
        <div id='projects'>
          //@ts-ignore
          { projects.map((project, i) => <Card key={i} index={i} project={project} />) }
        </div>
        //@ts-ignore
        <SignInModal isOpen={signInModalOpen} />
        <SignOutModal isOpen={signOutModalOpen} />
        //@ts-ignore
        <SubmitProposalModal isOpen={submitProjectModalOpen} />
      </div>
    )
  }
  return (
    <div className=" row justify-content-center align-items-center loader-wrapper">
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
