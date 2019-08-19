import firebase from '../config/firebase'
import {
  DISLIKE_PROJECT,
  LIKE_PROJECT,
  LOAD_PROJECTS_START,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_FAIL,
  UPDATE_PROJECTS_START,
  UPDATE_PROJECTS_FAIL,
  UPDATE_PROJECTS_SUCCESS,
  TOGGLE_SIGN_IN_MODAL,
  LOG_IN_STATUS_CHANGE
} from './actionTypes'

// actions types

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

export function toggleSigninModal () {
  return {
    type: TOGGLE_SIGN_IN_MODAL
  }
}

export function logInStateChange ({ userUID, loggedIn }) {
  return function (dispatch) {
    dispatch({
      type: LOG_IN_STATUS_CHANGE,
      payload: {
        userUID,
        loggedIn
      }
    })
  }
}
