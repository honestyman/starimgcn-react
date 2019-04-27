// Actions
import { SEARCH_FETCH_REQUEST,SEARCH_FETCH_SUCCESS,SEARCH_FETCH_FAIL} from '../actionTypes/searchActionTypes'

// initial state
const initState = {
    search_value: '',
    isFetching: true,
    lastUpdated: new Date().getTime(),
    current_page: 1,
    last_page: 1,
    data: []
}

export default function (state = initState, action) {
    switch (action.type) { 
        case SEARCH_FETCH_REQUEST: {
            console.log('---request');
            return {
                ...state,
                isFetching: true,
                lastUpdated: new Date().getTime()
            }; 
        }
        case SEARCH_FETCH_SUCCESS: { 
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
        case SEARCH_FETCH_FAIL: { 
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