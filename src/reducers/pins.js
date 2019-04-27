import { HOME_FETCH_FAIL, HOME_FETCH_SUCCESS, HOME_FETCH_REQUEST } from '../actionTypes/imageActionTypes'
const initState = {
        current_page: 1,
        last_page: 1,
        data: [],
        total: 0,
        isFetching: false,
}

export default function (state = initState, action) { 
    switch (action.type) {
        case HOME_FETCH_REQUEST: { 
            console.log('---request-pins-start--');
            return {
                ...state,
                isFetching: true,
                lastUpdated: new Date().getTime()
            }; 
        }
        case HOME_FETCH_SUCCESS: { 
            console.log('---request-pins-success--');
            const result = action.pins;
            return {
                current_page: result.current_page,
                last_page: result.last_page,
                total: result.total,
                data: state.data.length>0 ? state.data.concat(result.data): result.data,
                isFetching: false,
                lastUpdated: new Date().getTime()
    
            }; 
        }
        case HOME_FETCH_FAIL: { 
            console.log('---request-pins-fail--');
            return {
                ...state,
                isFetching: false,
                lastUpdated: new Date().getTime()
            }; 
        }
        default: { 
            return state;
        }
    }
}

