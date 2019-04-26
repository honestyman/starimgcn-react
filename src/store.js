import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import starReducer from './reducers/starReducer'

const reducer = combineReducers({
    star: starReducer,
});
  
export default createStore(reducer, applyMiddleware(thunk));