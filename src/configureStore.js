import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './reducers/index'

const composeEnhancers = composeWithDevTools({
  name: 'projectZed', actionsBlacklist: ['REDUX_STORAGE_SAVE']
})

export default function configureStore () {
  return createStore(
    rootReducer,
    // 'preloadedState' is an optional param
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
}
