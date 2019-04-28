import axios from 'axios';
import * as util from '../utils/window_util'

import { STAR_FETCH_FAIL, STAR_FETCH_SUCCESS, STAR_FETCH_REQUEST } from '../actionTypes/starActionTypes'


const  actionCreator= (type,data) =>({
    type: type,
    lastUpdated: new Date().getTime(),
    result:data
})

export const getStarDetail = (url,) => {
    return (dispatch, getState) => {
        dispatch(actionCreator(STAR_FETCH_REQUEST));
        return new Promise((resolve, reject) => {
            let _url = util.replaceUrl(url);
            axios.get(_url)
                .then(result => { 
                    // console.log(result.data);
                    if (result.data.star) {
                        dispatch(actionCreator(STAR_FETCH_SUCCESS,result.data));
                        resolve(Object.assign(result.data, {action_type: STAR_FETCH_SUCCESS}));
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