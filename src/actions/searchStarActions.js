import {SEARCH_STAR} from '../apis/request'

import { SEARCH_FETCH_REQUEST,SEARCH_FETCH_SUCCESS,SEARCH_FETCH_FAIL} from '../actionTypes/searchActionTypes'

const actionCreator = (type,data) => () => ({
    type:type,
    lastUpdated: new Date().getTime(),
    data
});

export const searchStar = (url, keyWord) => {
    return (dispatch, getState) => {
        dispatch(actionCreator(SEARCH_FETCH_REQUEST));
        return new Promise((resolve, reject) => { 
            SEARCH_STAR({ key: keyWord })
                .then(result => { 
                    if (result.data) {
                        dispatch(actionCreator(SEARCH_FETCH_SUCCESS,result));
                        resolve(result);
                    } else { 
                        dispatch(actionCreator(SEARCH_FETCH_FAIL))
                        reject(Object.assign({}, {'message':'异步加载数据失败'}))
                    }
                    
                })
                .catch(error => { 
                    console.log(error);
                    dispatch(actionCreator(SEARCH_FETCH_FAIL,error))
                    reject(Object.assign({}, {'message':'异步加载数据失败'}))
                })     
            }) 
        } ;
} 