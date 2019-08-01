import firebase from '../config/firebase'

// actions
export const LOAD_PROJECTS_START = 'LOAD_PROJECTS_START'
export const RECEIVE_PROJECTS = 'RECEIVE_POSTS'
export const LIKE_PROJECT = 'LIKE_PROJECT'

// actionCreators

export function likeProject (liked, index) {
  return {
    type: LIKE_PROJECT,
    index,
    liked
  }
}

export function loadProjects () {
  return function (dispatch) {
    firebase.database()
      .ref('projects')
      .on('value', (snapshot) => {
        dispatch(receiveProjects(snapshot.val()))
      })
  }
}

export function receiveProjects (projects) {
  return {
    type: RECEIVE_PROJECTS,
    projects: projects
  }
}
