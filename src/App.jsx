import React, { Component } from 'react'
import firebase from './config/firebase'
import Card from './components/Card'
import Navbar from './components/Navbar'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { loadProjects } from './actions/actionCreators'
import './App.scss'

firebase.auth().signInAnonymously()
class App extends Component {
  componentDidMount () {
    // this.props.loadProjects()
  }

  componentWillUnmount () {
    firebase.auth().signOut()
  }

loadData = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      firebase.database()
        .ref('projects')
        .on('value', (snapshot) => {
          this.setState({
            projects: snapshot.val()
          })
        })
      // ...
    } else {
      // User is signed out.
    }
  })
}

authenticate = provider => {
  const authProvider = new firebase.auth[`${provider}AuthProvider`]()
  firebase.auth().signInWithPopup(authProvider)
    .then(this.authHandler)
    .catch(function (error) {
      console.log(error)
    })
}

authHandler = async authData => {
  console.log(authData)
}

render () {
  const { projects } = this.props
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
            <div className="arrow bounce">
              <a className="fa fa-arrow-down fa-2x downArrow" href="#projects"></a>
            </div>
          </div>
        </div>
        <div id='projects'>
          { projects ? projects.map((project, i) =>
            <Card key={i} index={i} project= {project} />) : null
          }
        </div>
        <Modal
          isOpen={true}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Sign in modal">
          <div className='SigninModal'>
            <div className='socialSigninButton facebook' onClick={() => this.authenticate('Facebook')}>Facebook</div>
            <div className='socialSigninButton google' onClick={() => this.authenticate('Google')}>Google</div>
            <div className='socialSigninButton github' onClick={() => this.authenticate('Github')}>Github</div>
          </div>
        </Modal>
      </div>
    )
  }
  return (
    <div style={{ height: '100vh', backgroundColor: '#000' }} className=" row justify-content-center align-items-center">
      <div className="loader" />
    </div>
  )
}
}

const customStyles = {
  content: {
    width: '40%',
    height: '40%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

// this receives the state. it has a property 'projectsReducer' so we destructure here
function mapStateToProps ({ projectsReducer }) {
  return {
    projects: projectsReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadProjects: () => {
      dispatch(loadProjects())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
