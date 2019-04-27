import { combineReducers } from "redux";

import pins from './pins'
import star from './star'
import common from './common'
import stars from './stars'

 const rootReducer = combineReducers({
    pins,
    star,
    common,
    stars
 })
export default rootReducer;