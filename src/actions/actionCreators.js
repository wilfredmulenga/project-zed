// import firebase from '../config/firebase'

// actions types
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS'
export const DISLIKE_PROJECT = 'DISLIKE_PROJECT'
export const LIKE_PROJECT = 'LIKE_PROJECT'

// actionCreators
export function likeProject (liked, index) {
  return {
    type: LIKE_PROJECT,
    liked,
    index
  }
}

export function dislikeProject (liked, index) {
  return {
    type: DISLIKE_PROJECT,
    liked,
    index
  }
}

export function loadProjects () {
  return function (dispatch) {
    // firebase.database()
    //   .ref('projects')
    //   .on('value', (snapshot) => {
    //     dispatch(receiveProjects(snapshot.val()))
    //   })
  }
}

export function receiveProjects (projects) {
  return {
    type: RECEIVE_PROJECTS,
    projects: projects
  }
}
