// Actions
// import { SEARCH_FETCH_REQUEST,SEARCH_FETCH_SUCCESS,SEARCH_FETCH_FAIL} from '../actions/searchStarActions'

// initial sate
const initState = {
    search_value: '',
    stars: {
        isFetching: true,
        lastUpdated: new Date().getTime(),
        current_page: 1,
        last_page: 1,
        data: []
    },
    star_dtail: {
        ins_count: 0,
        wb_count: 0
    }
}

export default function (state = initState, action) {
    switch (action.type) { 
        case 'SEARCH_FETCH_REQUEST': {
            console.log('---request');
            return {
                ...state,
                stars: {
                    ...state.stars,
                    isFetching: true,
                    lastUpdated: new Date().getTime()
                }
       
            }; 
        }
        case 'SEARCH_FETCH_SUCCESS': { 
            console.log('request-success--')
            console.log(state);
            console.log(action.result)
            return {
                ...state,
                stars: {
                    isFetching: false,
                    lastUpdated: new Date().getTime(),
                    current_page: action.result.stars.current_page,
                    last_page: action.result.stars.last_page,
                    data: [...state.stars.data,action.result.stars.data] 
                }
            }
        }
        case 'SEARCH_FETCH_FAIL': { 
            return {
                ...state,
                stars: {
                    ...state.stars,
                    isFetching: false,
                    lastUpdated: new Date().getTime()
                }
            }
        }
        default: { 
             return state;
        }  
    }
} 