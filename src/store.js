import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import starReducer from './reducers/starReducer'
import imageReducer from './reducers/imageReducer';

const reducer = combineReducers({
    star: starReducer,
    pins: imageReducer
});
  
export default createStore(reducer, applyMiddleware(thunk));