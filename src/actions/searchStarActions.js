import axios from 'axios';
// 搜索请求开始
export const SEARCH_FETCH_REQUEST = ()=> ({
    type: 'SEARCH_FETCH_REQUEST',
    lastUpdated: new Date().getTime()
})
// 搜索请求成功
export const SEARCH_FETCH_SUCCESS =(result)=> ({
    type: 'SEARCH_FETCH_SUCCESS',
    lastUpdated: new Date().getTime(),
    result
})
// 搜索请求失败
export const SEARCH_FETCH_FAIL = (error) => ({
    type: 'SEARCH_FETCH_FAIL',
    lastUpdated: new Date().getTime(),
    error
})

// const actionCreator = (type,lastUpdated) => () => ({
//     type,
//     lastUpdated: new Date().getTime()
// });

export const searchStar = (url, keyWord) => {
    return (dispatch, getState) => {
        dispatch(SEARCH_FETCH_REQUEST());
        return new Promise((resolve, reject) => { 
            axios.get(url + '?key=' + keyWord)
                .then(result => { 
                    if (result.data) {
                        dispatch(SEARCH_FETCH_SUCCESS(result.data));
                        resolve(result);
                    } else { 
                        reject(Object.assign({}, {'message':'异步加载数据失败'}))
                    }
                    
                })
                .catch(error => { 
                    console.log(error);
                    dispatch(SEARCH_FETCH_FAIL(error))
                    reject(Object.assign({}, {'message':'异步加载数据失败'}))
                })     
            }) 
        } ;
} 