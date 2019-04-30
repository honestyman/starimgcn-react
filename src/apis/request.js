import axios from 'axios';
import { commonRequest, INVALID_TOKEN } from './config'
// import ErrorToast from '../components/Toast/errorToast'
// POST/GET/PUT/DELETE 请求
function Request (url, method, params, data, visible = true, errcb) {
    if (visible) {
      console.log('---加载中---')
    }
    return new Promise(function (resolve, reject) {
      axios(commonRequest(url, method, params, data)).then((res) => {
        if (res.data) {
          resolve(res.data)
        }else if (res.data.code === INVALID_TOKEN) {
            reject({'message': '无效的 Token 值！'})
        } else if (errcb) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
    })
}

// api 接口

/**
 * 获取最新的 图片
 */
export const GET_RECENT_PINS = (data) => Request('/getRecentImages', 'get', data, undefined)
 
export const GET_STAR_PINS = (data) => Request('/starImages/'+data.domain,'get',data,undefined)
/**
 * 关键词搜索明星
 * @param key
 */
export const SEARCH_STAR = (data) => Request('/searchSatr','get',undefined,data)
