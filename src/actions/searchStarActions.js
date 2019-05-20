import {SEARCH_STAR} from '../apis/request'

import { SEARCH_FETCH_REQUEST,SEARCH_FETCH_SUCCESS,SEARCH_FETCH_FAIL} from '../actionTypes/searchActionTypes'

const actionCreator = (type,data) => ({
    type:type,
    lastUpdated: new Date().getTime(),
    data
});

export const searchStar = (url, keyWord) => {
    return (dispatch, getState) => {
        // 请求开始
        dispatch(actionCreator(SEARCH_FETCH_REQUEST, {'search_value': keyWord }));
        return new Promise((resolve, reject) => { 
            SEARCH_STAR({ key: keyWord })
                .then(result => { 
                    if (result.data) {
                        // 请求成功
                        dispatch(actionCreator(SEARCH_FETCH_SUCCESS, { ...result,'search_value': keyWord }));
                        resolve(result);
                    } else { 
                        // 获取数据失败
                        dispatch(actionCreator(SEARCH_FETCH_FAIL,{'search_value': keyWord }))
                        reject(Object.assign({}, {'message':'异步加载数据失败'}))
                    }
                    
                })
                .catch(error => { 
                    // 请求过程发生错误
                    console.log(error);
                    dispatch(actionCreator(SEARCH_FETCH_FAIL,error,{'search_value': keyWord }))
                    reject(Object.assign({}, {'message':'异步加载数据失败'}))
                })     
            }) 
        } ;
} 