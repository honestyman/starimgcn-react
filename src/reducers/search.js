// Actions
import { SEARCH_FETCH_REQUEST,SEARCH_FETCH_SUCCESS,SEARCH_FETCH_FAIL} from '../actionTypes/searchActionTypes'

// initial state
const initState = {
    search_value: '',
    isFetching: false,
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
                lastUpdated: new Date().getTime(),
                search_value: action.data.search_value
            }; 
        }
        case SEARCH_FETCH_SUCCESS: { 
            console.log('request-success--')
            return {
                ...state,
                isFetching: false,
                lastUpdated: new Date().getTime(),
                current_page: action.data.current_page,
                last_page: action.data.last_page,
                data: [...action.data.data],
                search_value: action.data.search_value
            }
        }
        case SEARCH_FETCH_FAIL: { 
            console.log('request-fail--')
            return {
                ...state,
                isFetching: false,
                lastUpdated: new Date().getTime(),
                search_value: action.search_value
            }
        }
        default: { 
             return state;
        }  
    }
} 