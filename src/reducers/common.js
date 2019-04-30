import { SHOW_TOAST, CLOSE_TOAST } from '../actionTypes/commonActionTypes'
// 全站通用 state ，包含消息提示，以及 token 等信息
const initState = {
    toast: {
        show: false,
        text: ''
    },
    token: ''
}


export default function (state = initState, action) { 
    switch (action.type) {
        case SHOW_TOAST: { 
            return {
                ...state,
                toast: {
                    text: action.text,
                    show: true
                }
            };
        }
        case CLOSE_TOAST: { 
            return {
                ...state,
                toast: {
                    ...state.toast,
                    show: false
                }
            };
        }
        default: { 
            return state;
        }
    }
}