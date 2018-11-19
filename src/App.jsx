import React, { Component } from 'react';
import firebase from './config/firebase'
import './App.css';


const whiteBackground = {
  backgroundColor : '#FFF'
}

firebase.auth().signInAnonymously()

class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        listOfProjects : []
      }
      this.loadData() 
}
loadData = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.

      firebase.database()
            .ref('projects')
            .on('value', (snapshot) => {
              this.setState({
                listOfProjects : snapshot.val()
              })
              
            })
      // ...
    } else {
      // User is signed out.
    }
    })
}
  
  render() {
    const { listOfProjects } = this.state
        return (
      <div style={{backgroundColor:'#000'}}>
        {/* landing page */}
        <div style={{height:'100vh'}}>
        <div style={{
              position: 'absolute', bottom: 0, width: '100%', height: '70%',
              textAlign: 'center'
            }}>
            <div>
            <p style={{fontSize:60, color: '#FFF', float: 'center'}}>Project Zed</p>

            </div>
              <p style={{ fontSize: 40, color: '#FFF', float: 'center', marginLeft: '20px' }}>
              Find projects done by Zambian Developers.</p>

            </div>
        </div>
        {/* list of projects */}
          {(listOfProjects)? listOfProjects.map((element,i) => ( <div key={i}  className='row justify-content-center'>
              <div className='col-md-8 col-sm-8 mb-4'>
              <div className="">
  <div className="card-body row" style={whiteBackground} >
  <div className="col-5">
        <p style={{display:'inline', marginBottom:20}} className="card-title">{element.githubUsername}</p>
        <p>Tools</p>
        {element.tools.map((element,i)=>( <p key={i} className="card-subtitle">{element}</p> ))}
  </div>
  <div className="col-7">
            <p style={{display:'inline', marginBottom:20}}>{element.description}</p>
            <p> Link:<a rel="noopener noreferrer" target='_blank' href={element.link}>{element.link}</a> </p>
  </div>
    </div>
    </div>
              </div>
          </div>))
        : null  
        }
      </div>
    );
  }
}

export default App;
