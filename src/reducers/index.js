import { combineReducers } from "redux";

import pins from './pins'
import star from './star'
import common from './common'
import stars from './stars'
import search from './search'

 const rootReducer = combineReducers({
    pins,
    star,
    common,
    stars,
    search
 })
export default rootReducer;