// import axios from 'axios';
// import * as util from '../utils/star_util'

import { PINS_FETCH_FAIL, PINS_FETCH_SUCCESS, PINS_FETCH_REQUEST } from '../actionTypes/pinsActionTypes'

import { GET_RECENT_PINS, GET_STAR_PINS } from '../apis/request'

const  actionCreator= (type,data) =>({
    type: type,
    lastUpdated: new Date().getTime(),
    pins:data
})
/**
 *  获取 pins
 * @param {home,${domain}} type 
 * @param {*} page 
 * @param {*} data 
 */
export const getPins = (type, page,data) => {
    return (dispatch, getState) => {
        dispatch(actionCreator(PINS_FETCH_REQUEST));
        return new Promise((resolve, reject) => {
            let params = {
                page: page
            }
            if (data) {
                Object.assign(params,data)
            }
            if (type === 'home') {
                // 获取首页最新图片列表
                GET_RECENT_PINS(params)
                    .then(result => {
                        // console.log(result.data);
                        if (result.data) {
                            dispatch(actionCreator(PINS_FETCH_SUCCESS, result));
                            resolve(Object.assign({}, { action_type: PINS_FETCH_SUCCESS }));
                        } else {
                            resolve(Object.assign({}, { 'message': '异步加载数据失败--1', action_type: PINS_FETCH_FAIL }))
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        dispatch(actionCreator(PINS_FETCH_FAIL, error))
                        reject(Object.assign({}, { 'message': '异步加载数据失败---2', action_type: PINS_FETCH_FAIL }))
                    })
            } else { 
                // 获取某位明星的图片列表
                GET_STAR_PINS(params)
                .then(result => {
                    // console.log(result.data);
                    if (result.data) {
                        dispatch(actionCreator(PINS_FETCH_SUCCESS, result));
                        resolve(Object.assign({}, { action_type: PINS_FETCH_SUCCESS }));
                    } else {
                        resolve(Object.assign({}, { 'message': '异步加载数据失败--1', action_type: PINS_FETCH_FAIL }))
                    }
                })
                .catch(error => {
                    console.log(error);
                    dispatch(actionCreator(PINS_FETCH_FAIL, error))
                    reject(Object.assign({}, { 'message': '异步加载数据失败---2', action_type: PINS_FETCH_FAIL }))
                })
            } 
        }) 
    } ;
} 

