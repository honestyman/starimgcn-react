import axios from 'axios';
import * as util from '../utils/window_util'

import { HOME_FETCH_FAIL, HOME_FETCH_SUCCESS, HOME_FETCH_REQUEST } from '../actionTypes/imageActionTypes'


const  actionCreator= (type,data) =>({
    type: type,
    lastUpdated: new Date().getTime(),
    pins:data
})

export const getRecentImages = (url, page) => {
    return (dispatch, getState) => {
        dispatch(actionCreator(HOME_FETCH_REQUEST));
        return new Promise((resolve, reject) => {
            let _url = util.replaceUrl(url);
            axios.get(_url + '?page=' + page)
                .then(result => { 
                    // console.log(result.data);
                    if (result.data.total >0) {
                        dispatch(actionCreator(HOME_FETCH_SUCCESS,result.data));
                        resolve(Object.assign(result, {action_type: HOME_FETCH_SUCCESS}));
                    } else { 
                        reject(Object.assign({}, {'message':'异步加载数据失败--1'}))
                    }
                })
                .catch(error => { 
                    console.log(error);
                    dispatch(actionCreator(HOME_FETCH_FAIL,error))
                    reject(Object.assign({}, {'message':'异步加载数据失败---2',action_type: HOME_FETCH_FAIL}))
                })     
            }) 
        } ;
} 