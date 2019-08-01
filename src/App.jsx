import React, { Component } from 'react'
import firebase from './config/firebase'
import Card from './components/Card'
import { connect } from 'react-redux'
import { likeProject, loadProjects } from './actions/actionCreators'
import './App.css'

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

render () {
  const { projects } = this.props
  if (projects && projects.length !== 0) {
    return (
      <div style={{ backgroundColor: '#000' }}>
        {/* landing page */}
        <div style={{ height: '100vh' }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '70%',
            textAlign: 'center'
          }}
          >
            <div>
              <p style={{ fontSize: 60, color: '#FFF', float: 'center' }}>Project Zed</p>
            </div>
            <p style={{
              fontSize: 40, color: '#FFF', float: 'center', marginLeft: '20px'
            }}
            >
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

function mapStateToProps ({ projectsReducer }) {
  const { projects } = projectsReducer
  console.log('props', projects)
  return {
    projects
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
