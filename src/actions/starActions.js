import { STAR_FETCH_FAIL, STAR_FETCH_SUCCESS, STAR_FETCH_REQUEST } from '../actionTypes/starActionTypes'
import { GET_STAR_DETAIL } from '../apis/request'

const  actionCreator= (type,data) =>({
    type: type,
    lastUpdated: new Date().getTime(),
    result:data
})
/**
 * 获取 star 的详细信息
 * @param {url} url 
 */
export const getStarDetail = (domain) => {
    return (dispatch, getState) => {
        dispatch(actionCreator(STAR_FETCH_REQUEST));
        return new Promise((resolve, reject) => {
            GET_STAR_DETAIL({ domain: domain})
                .then(result => { 
                    if (result.star) {
                        dispatch(actionCreator(STAR_FETCH_SUCCESS,result));
                        resolve(Object.assign(result, {action_type: STAR_FETCH_SUCCESS}));
                    } else { 
                        reject(Object.assign({}, {'message':'异步加载数据失败--1'}))
                    }
                })
                .catch(error => { 
                    console.log(error);
                    dispatch(actionCreator(STAR_FETCH_FAIL,error))
                    reject(Object.assign({}, {'message':'异步加载数据失败---2',action_type: STAR_FETCH_FAIL}))
                })     
            }) 
        } ;
} 

