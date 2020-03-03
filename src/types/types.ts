export type Home = {
  signInModalOpen: boolean,
  signOutModalOpen: boolean,
  userUID: string,
  loggedIn: boolean,
  submitProjectModalOpen: boolean
}

export type Dispatch = (any) => void

export type Project = {
  projectOwner: string,
  tools: Array<string>,
  description: string,
  typeOfProject: string,
  link: string,
  loading: boolean,
  responseMessage: string,
  submitted: boolean,
  projectId: string,
  userUID: string,
  likedBy: string,
  likes: number,
  type: string
}

export interface HOME_REDUCER {
  signInModalOpen: boolean,
  signOutModalOpen: boolean,
  userUID: null | string,
  loggedIn: boolean,
  submitProjectModalOpen: boolean
}
