import axios from 'axios';
import * as util from '../utils/star_util'

import { STARS_FETCH_FAIL, STARS_FETCH_SUCCESS, STARS_FETCH_REQUEST } from '../actionTypes/starsActionTypes'


const  actionCreator= (type,data) =>({
    type: type,
    lastUpdated: new Date().getTime(),
    result:data
})

export const getStarLists = (url, page) => {
    return (dispatch, getState) => {
        dispatch(actionCreator(STARS_FETCH_REQUEST));
        return new Promise((resolve, reject) => {
            let _url = util.replaceUrl(url);
            axios.get(_url + '?page=' + page)
                .then(result => { 
                    // console.log(result.data);
                    if (result.data.total >0) {
                        dispatch(actionCreator(STARS_FETCH_SUCCESS,result.data));
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