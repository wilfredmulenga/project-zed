import firebase from '../config/firebase'

// actions types
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS'
export const DISLIKE_PROJECT = 'DISLIKE_PROJECT'
export const LIKE_PROJECT = 'LIKE_PROJECT'
export const LOAD_PROJECTS_START = 'LOAD_PROJECTS_START'
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS'
export const LOAD_PROJECTS_FAIL = 'LOAD_PROJECTS_FAIL'
export const UPDATE_PROJECTS_START = 'UPDATE_PROJECTS_START'
export const UPDATE_PROJECTS_FAIL = 'UPDATE_PROJECTS_FAIL'
export const UPDATE_PROJECTS_SUCCESS = 'UPDATE_PROJECTS_SUCCESS'

// actionCreators
export function likeOrDislike (index, liked) {
  return function (dispatch, getState) {
    const { projectsReducer: projects } = getState()
    if (liked) {
      dispatch({ type: LIKE_PROJECT, index })
    } else {
      dispatch({ type: DISLIKE_PROJECT, index })
    }
    dispatch({ type: UPDATE_PROJECTS_START })
    const updateProjectsRef = firebase.database().ref(`projects/${index}`)
    updateProjectsRef.set({
      ...projects[index],
      likes: (liked) ? projects[index].likes + 1 : projects[index].likes - 1
    }, function () {
      dispatch({ type: UPDATE_PROJECTS_SUCCESS })
    }).catch(function (error) {
      dispatch({
        type: UPDATE_PROJECTS_FAIL,
        payload: error
      })
    })
  }
}

export function loadProjects () {
  return function (dispatch) {
    dispatch({ type: LOAD_PROJECTS_START })

    const projectsRef = firebase.database().ref('projects')
    projectsRef.once('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch({
          type: LOAD_PROJECTS_SUCCESS,
          payload: snapshot.val()
        })
      }
    }, error => {
      dispatch({
        type: LOAD_PROJECTS_FAIL,
        payload: error
      })
    })
  }
}
