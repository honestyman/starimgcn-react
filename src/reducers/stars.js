// Actions
import { STARS_FETCH_FAIL, STARS_FETCH_SUCCESS, STARS_FETCH_REQUEST} from '../actionTypes/starsActionTypes'

// initial state
const initState = {
    isFetching: true,
    lastUpdated: new Date().getTime(),
    current_page: 1,
    last_page: 1,
    data: [],
    show_search: true
}

export default function (state = initState, action) {
    switch (action.type) { 
        case STARS_FETCH_REQUEST: {
            console.log('---request');
            return {
                ...state,
                isFetching: true,
                lastUpdated: new Date().getTime()
            }; 
        }
        case STARS_FETCH_SUCCESS: { 
            console.log('request-success--')
            return {
                ...state,
                isFetching: false,
                lastUpdated: new Date().getTime(),
                current_page: action.result.current_page,
                last_page: action.result.last_page,
                data: [...state.data,...action.result.data] 
            }
        }
        case STARS_FETCH_FAIL: { 
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