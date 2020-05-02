import createDataContext from './createDataContext'
import data from '../data'
const projectsReducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const { Context, Provider } = createDataContext(
  projectsReducer,
  { },
  data
)
