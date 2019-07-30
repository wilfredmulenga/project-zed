import firebase from '../config/firebase'

export const LOAD_PROJECTS_START = 'LOAD_PROJECTS_START'

export function loadProjects() {
  return function (dispatch) {
    firebase.database()
    .ref('projects')
    .on('value', (snapshot) => {
      dispatch(receiveProjects(snapshot.val()))
      console.log(snapshot.val())
    })
  }
}

export const RECEIVE_PROJECTS = 'RECEIVE_POSTS'
export function receiveProjects(projects) {
  return {
    type: RECEIVE_PROJECTS,
    projects: projects
  }
}