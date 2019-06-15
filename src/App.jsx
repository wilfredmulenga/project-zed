import React, { Component } from 'react';
import firebase from './config/firebase';
import './App.css';

const whiteBackground = {
  backgroundColor: '#FFF',
};

firebase.auth().signInAnonymously();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfProjects: [],
    };
    this.loadData();
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
       <div id='projects'>
       {(listOfProjects) ? listOfProjects.map((project, i) => (
          <div key={i} className="row justify-content-center">
            <div className="col-md-8 col-sm-8 mb-4">
              <div>
                <div className="card-body row" style={whiteBackground}>
                  <div className="col-5">
                    <p style={{ display: 'inline', marginBottom: 20 }} className="card-title">{project.githubUsername}</p>
                    <p>
Tools:
                      {' '}
                      {project.tools.map((element, i) => (<span key={i} className="card-subtitle mr-1">{element}</span>))}
                    </p>
                    <p>{project.type}</p>
                  </div>
                  <div className="col-7">
                    <p style={{ display: 'inline', marginBottom: 20 }}>{project.description}</p>
                    <p>
                      {' '}
Link:
                      {' '}
                      <a rel="noopener noreferrer" target="_blank" href={project.link}>{project.link}</a>
                      {' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
          : null
        }
      </div>
       </div>
    );
  }
  return (
    <div style={{ height: '100vh', backgroundColor: '#000' }} className=" row justify-content-center align-items-center">
      <div className="loader" />
    </div>
  );
}
}

export default App;