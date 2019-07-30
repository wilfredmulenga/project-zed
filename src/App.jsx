import React, { Component } from 'react'
import firebase from './config/firebase'
import Card from './components/Card'
import { connect } from 'react-redux'
import { loadProjects } from './actions/actions'
import './App.css'

firebase.auth().signInAnonymously();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfProjects: [],
    };
    // this.loadData();
  }

  componentDidMount(){
    this.props.dispatch(loadProjects())
  }

  componentWillReceiveProps() {
    console.log('this props', this.props)
  }

  componentWillUnmount() {
    firebase.auth().signOut();
  }

loadData = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      firebase.database()
        .ref('projects')
        .on('value', (snapshot) => {
          this.setState({
            listOfProjects: snapshot.val(),
          });
        });
      // ...
    } else {
      // User is signed out.
    }
  });
}


render() {
  const { listOfProjects } = this.state;
  // if data from firebase not yet loaded, show loader
  if (listOfProjects.length !== 0) {
    return (
      <div style={{ backgroundColor: '#000' }}>
        {/* landing page */}
        <div style={{ height: '100vh' }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '70%',
            textAlign: 'center',
          }}
          >
            <div>
              <p style={{ fontSize: 60, color: '#FFF', float: 'center' }}>Project Zed</p>
            </div>
            <p style={{
              fontSize: 40, color: '#FFF', float: 'center', marginLeft: '20px',
            }}
            >
              Find projects done by Zambian Developers
            </p>
            <div className="arrow bounce">
                <a className="fa fa-arrow-down fa-2x downArrow" href="#projects"></a>
            </div>
          </div>
        </div>
        {/* list of projects */}
        <button onClick={() => this.props.dispatch(loadProjects('projects'))}>Click me</button>
       <div id='projects'>
       { listOfProjects ? listOfProjects.map((project, i) => <Card key={i} project= {project} />) : null }
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

function mapStateToProps (state) {
  console.log('app', state)
  return state
}

export default connect(mapStateToProps)(App)
