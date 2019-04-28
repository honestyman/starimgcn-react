// Actions
import { STAR_FETCH_REQUEST,STAR_FETCH_SUCCESS,STAR_FETCH_FAIL} from '../actionTypes/starActionTypes'

// initial state
const initState = {
    isFetching: false,
    star: {  }
}

export default function (state = initState, action) {
    switch (action.type) { 
        case STAR_FETCH_REQUEST: {
            console.log('---request');
            return {
                ...state,
                isFetching: true,
                lastUpdated: new Date().getTime()
            }; 
        }
        case STAR_FETCH_SUCCESS: { 
            console.log('request-success--')
            return {
                ...state,
                isFetching: false,
                star: action.result.star
            }
        }
        case STAR_FETCH_FAIL: { 
            return {
                ...state,
                isFetching: false,
                lastUpdated: new Date().getTime()
            }
        }
        default: { 
             return state;
        }  
    }
} 