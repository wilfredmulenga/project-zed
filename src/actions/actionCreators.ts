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
import { Project } from '../types/types'

// actionCreators
export function likeOrDislike ({
  projectId,
  projectUserUID,
  userUID,
  liked,
  index
}: {
  projectId: string,
  projectUserUID: string,
  userUID: string,
  liked: boolean,
  index: number
}) {
  return function (dispatch: { type: string, index?: number, userUID?: string }) {
    if (liked) {
      dispatch({ type: LIKE_PROJECT, index, userUID })
    } else {
      dispatch({ type: DISLIKE_PROJECT, index, userUID })
    }
    dispatch({ type: UPDATE_PROJECTS_START })

    // uncomment this code block if you are using firebase database
    firebase
      .database()
      .ref(`users/${projectUserUID}/projects/${projectId}/`)
      .once('value')
      .then(function (snapshot) {
        const project = snapshot.val()
        const { likes, likedBy } = project
        firebase
          .database()
          .ref(`users/${projectUserUID}/projects/${projectId}/`)
          .update(
            {
              likes: liked ? likes + 1 : likes - 1,
              likedBy: liked
                ? [...likedBy, userUID]
                : likedBy.filter((userUIDs: Array<string>) => userUIDs !== userUID)
            },
            function () {
              dispatch({ type: UPDATE_PROJECTS_SUCCESS })
            }
          )
          .catch(function (error) {
            dispatch({
              type: UPDATE_PROJECTS_FAIL,
              payload: error
            })
          })
      })
  }
}

export function loadProjects () {
  return function (dispatch: { type: string, payload?: Project[] }) {
    dispatch({ type: LOAD_PROJECTS_START })

    const projectsRef = firebase.database().ref('users')
    projectsRef.once(
      'value',
      snapshot => {
        const listOfProjects: Project[] = []

        for (const project in snapshot.val()) {
          const projects: [] = snapshot.val()[project]['projects']
          for (const i of projects) {
            // eslint-disable-next-line  no-unused-expressions
            listOfProjects.push[i]
          }
        }
        dispatch({
          type: LOAD_PROJECTS_SUCCESS,
          payload: listOfProjects
        })
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error)
        dispatch({
          type: LOAD_PROJECTS_FAIL
        })
      }
    )
  }
}

export function toggleSignInModal (): { type: string } {
  return {
    type: TOGGLE_SIGN_IN_MODAL
  }
}

export function logInStateChange ({ userUID, loggedIn }: { userUID: string, loggedIn: boolean }) {
  return function (dispatch: { type: string, payload: { userUID: string, loggedIn: boolean } }) {
    dispatch({
      type: LOG_IN_STATUS_CHANGE,
      payload: {
        userUID,
        loggedIn
      }
    })
  }
}

export function toggleSignOutModal (): { type: string } {
  return {
    type: TOGGLE_SIGN_OUT_MODAL
  }
}

export function toggleSubmitProjectModal (): { type: string } {
  return {
    type: TOGGLE_SUBMIT_PROJECT_MODAL
  }
}

export async function addProject ({ project }) {
  let result
  await firebase.firestore().collection('projects').add({ project })
    .then(function (value) {
      result = value
    })
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding document: ', error)
    })
  return result
}
