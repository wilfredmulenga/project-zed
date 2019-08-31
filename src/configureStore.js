import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore () {
  return createStore(
    rootReducer,
    // 'preloadedState' is an optional param
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
}
