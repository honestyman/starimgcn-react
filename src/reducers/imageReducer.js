import { HOME_FETCH_FAIL, HOME_FETCH_SUCCESS, HOME_FETCH_REQUEST } from '../actionTypes/imageActionTypes'
const initState = {
    home_pins: {
        current_page: 1,
        last_page: 1,
        data: [],
        total: 0,
        isFetching: false
    },
    wb_pins: {
        current_page: 1,
        last_page: 1,
        data: [],
        total: 0,
        isFetching: false
    },
    ins_pins: {
        current_page: 1,
        last_page: 1,
        data: [],
        total: 0,
        isFetching: false
    }
}

export default function (state = initState, action) { 
    switch (action.type) {
        case HOME_FETCH_REQUEST: { 
            console.log('---request--start--');
            return {
                ...state,
                home_pins: {
                    ...state.home_pins,
                    isFetching: true,
                    lastUpdated: new Date().getTime()
                }
            }; 
        }
        case HOME_FETCH_SUCCESS: { 
            console.log('---request--success--');
            const result = action.pins;
            let _state = state.home_pins;
            return {
                ...state,
                home_pins: {
                    current_page: result.current_page,
                    last_page: result.last_page,
                    total: result.total,
                    data: _state.data.length>0 ? _state.data.concat(result.data): result.data,
                    isFetching: false,
                    lastUpdated: new Date().getTime()
                }
            }; 
        }
        case HOME_FETCH_FAIL: { 
            console.log('---request-fail--');
            return {
                ...state,
                home_pins: {
                    ...state.home_pins,
                    isFetching: false,
                    lastUpdated: new Date().getTime()
                }
            }; 
        }
        default: { 
            return state;
        }
    }
}

