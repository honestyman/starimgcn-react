import axios from 'axios';
import * as util from '../utils/star_util'

import { PINS_FETCH_FAIL, PINS_FETCH_SUCCESS, PINS_FETCH_REQUEST } from '../actionTypes/pinsActionTypes'


const  actionCreator= (type,data) =>({
    type: type,
    lastUpdated: new Date().getTime(),
    pins:data
})

export const getRecentImages = (url, page,data) => {
    return (dispatch, getState) => {
        dispatch(actionCreator(PINS_FETCH_REQUEST));
        return new Promise((resolve, reject) => {
            let _url = util.replaceUrl(url);
            let params = {
                page: page
            }
            if (data) {
                Object.assign(params,data)
            }
            axios.get(_url, { params: params })
                .then(result => { 
                    // console.log(result.data);
                    if (result.data.data) {
                        dispatch(actionCreator(PINS_FETCH_SUCCESS,result.data));
                        resolve(Object.assign(result, {action_type: PINS_FETCH_SUCCESS}));
                    } else { 
                        reject(Object.assign({}, {'message':'异步加载数据失败--1'}))
                    }
                })
                .catch(error => { 
                    console.log(error);
                    dispatch(actionCreator(PINS_FETCH_FAIL,error))
                    reject(Object.assign({}, {'message':'异步加载数据失败---2',action_type: PINS_FETCH_FAIL}))
                })     
            }) 
        } ;
} 