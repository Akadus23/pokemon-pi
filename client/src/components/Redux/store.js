import reducer from './reducer'
import thunk from 'redux-thunk'
import { legacy_createStore as createStore, applyMiddleware }  from 'redux'


const store = createStore(reducer, applyMiddleware(thunk))

export default store;