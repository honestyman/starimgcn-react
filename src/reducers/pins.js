import { PINS_FETCH_FAIL, PINS_FETCH_SUCCESS, PINS_FETCH_REQUEST } from '../actionTypes/pinsActionTypes'
const initState = {
        current_page: 1,
        last_page: 1,
        data: [],
        total: 0,
        isFetching: false,
}

export default function (state = initState, action) { 
    switch (action.type) {
        case PINS_FETCH_REQUEST: { 
            console.log('---request-pins-start--');
            return {
                ...state,
                isFetching: true,
                lastUpdated: new Date().getTime()
            }; 
        }
        case PINS_FETCH_SUCCESS: { 
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
        case PINS_FETCH_FAIL: { 
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

