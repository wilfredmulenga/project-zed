import firebase from '../../config/firebase'
import { useContext } from 'react'
import { Context as ProjectContext } from '../../config/projectContext'
import { Project } from '../../types/types'

export function fetchProjects () {
  const { loadProjects } = useContext(ProjectContext)
  const result: Array<Project> = []
  const getProjects = async () => {
    await firebase.firestore().collection('projects').get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const { project } = doc.data()
          result.push(project)
        })
      })
    loadProjects(result)
  }

  return { getProjects }
}
