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
  LOG_IN_STATUS_CHANGE,
  TOGGLE_SIGN_OUT_MODAL,
  TOGGLE_SUBMIT_PROJECT_MODAL
} from './actionTypes'

// actionCreators
export function likeOrDislike (projectId, userUID, liked) {
  return function (dispatch, getState) {
    if (liked) {
      dispatch({ type: LIKE_PROJECT, projectId })
    } else {
      dispatch({ type: DISLIKE_PROJECT, projectId })
    }
    dispatch({ type: UPDATE_PROJECTS_START })

    firebase.database().ref(`users/${userUID}/projects/${projectId}/`).once('value')
      .then(function (snapshot) {
        const project = snapshot.val()
        firebase.database().ref(`users/${userUID}/projects/${projectId}/`).update({
          likes: (liked) ? project.likes + 1 : project.likes - 1
        }, function () {
          dispatch({ type: UPDATE_PROJECTS_SUCCESS })
        }).catch(function (error) {
          dispatch({
            type: UPDATE_PROJECTS_FAIL,
            payload: error
          })
        })
      })
  }
}

export function loadProjects () {
  return function (dispatch) {
    dispatch({ type: LOAD_PROJECTS_START })

    const projectsRef = firebase.database().ref('users')
    projectsRef.once('value', (snapshot) => {
      const listOfProjects = []

      for (const project in snapshot.val()) {
        const projects = snapshot.val()[project]['projects']
        for (const i in projects) {
          listOfProjects.push(projects[i])
        }
      }
      dispatch({
        type: LOAD_PROJECTS_SUCCESS,
        payload: listOfProjects
      })
    }, error => {
      dispatch({
        type: LOAD_PROJECTS_FAIL,
        payload: error
      })
    })
  }
}

export function toggleSignInModal () {
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

export function toggleSignOutModal () {
  return {
    type: TOGGLE_SIGN_OUT_MODAL
  }
}

export function toggleSubmitProjectModal () {
  return {
    type: TOGGLE_SUBMIT_PROJECT_MODAL
  }
}
