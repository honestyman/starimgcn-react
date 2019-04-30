import { SHOW_TOAST, CLOSE_TOAST } from '../actionTypes/commonActionTypes'

const  actionCreator= (type,text) =>({
    type: type,
    text: text
})

export const TOGGLE_TOAST = (type,text) => { 
    return (dispatch, getState) => { 
        if (type === SHOW_TOAST) {
            dispatch(actionCreator(SHOW_TOAST,text))
        } else if (type === CLOSE_TOAST) { 
            dispatch(actionCreator(CLOSE_TOAST))
        }
    }
}
