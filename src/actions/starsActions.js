import { STARS_FETCH_FAIL, STARS_FETCH_SUCCESS, STARS_FETCH_REQUEST } from '../actionTypes/starsActionTypes'
import { GET_STAR_LIST } from '../apis/request'

const  actionCreator= (type,data) =>({
    type: type,
    lastUpdated: new Date().getTime(),
    result:data
})

export const getStarLists = ( page) => {
    return (dispatch, getState) => {
        dispatch(actionCreator(STARS_FETCH_REQUEST));
        return new Promise((resolve, reject) => {
            GET_STAR_LIST({page: page})
                .then(result => { 
                    if (result.total >0) {
                        dispatch(actionCreator(STARS_FETCH_SUCCESS,result));
                        resolve(Object.assign(result, {action_type: STARS_FETCH_SUCCESS}));
                    } else { 
                        reject(Object.assign({}, {'message':'异步加载数据失败--1'}))
                    }
                })
                .catch(error => { 
                    console.log(error);
                    dispatch(actionCreator(STARS_FETCH_FAIL,error))
                    reject(Object.assign({}, {'message':'异步加载数据失败---2',action_type: STARS_FETCH_FAIL}))
                })     
            }) 
        } ;
} 