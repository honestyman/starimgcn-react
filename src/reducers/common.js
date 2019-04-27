// 全站通用 state ，包含消息提示，以及 token 等信息 
const initState = {
    toast: {
        show: false,
        text: ''
    },
    token: ''
}
const SHOW_TOAST = 'SHOW_TOAST';

export default function (state = initState, action) { 
    switch (action.type) {
        case SHOW_TOAST: { 
            return state;
        }
        default: { 
            return state;
        }
    }
}