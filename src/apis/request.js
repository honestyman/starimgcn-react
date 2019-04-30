import axios from "axios";
import { commonRequest, INVALID_TOKEN } from "./config";

// POST/GET/PUT/DELETE 请求
function Request(url, method, data, errcb) {
	
    return new Promise(function(resolve, reject) {
        axios(commonRequest(url, method, data))
			.then(res => {
                if (res.data) {
                    resolve(res.data);
                } else if (res.data.code === INVALID_TOKEN) {
					reject({ message: "无效的 Token 值！" });
                } else if (errcb) {
                    errcb();
                    resolve(res.data);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

//------- api 接口 -------

/**
 * 获取最新的首页图片列表信息
 */
export const GET_RECENT_PINS = data =>
    Request("/getRecentImages", "get", data, undefined);

/**
 * 获取明星的图片列表信息
 * @param {*} data
 */
export const GET_STAR_PINS = data =>
    Request("/starImages/" + data.domain, "get", data, undefined);

/**
 * 获取明星详情
 * @param {*} data
 */

export const GET_STAR_DETAIL = data =>
    Request("/star/" + data.domain, "get", data, undefined);

/**
 * 获取明星列表信息
 * @param {*} data
 */
export const GET_STAR_LIST = data =>
    Request("/getStars", "get", data, undefined);
/**
 * 关键词搜索明星
 * @param key
 */
export const SEARCH_STAR = data =>
    Request("/searchStar", "get", data, undefined);
