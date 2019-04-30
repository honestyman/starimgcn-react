export function getHeaders () {
  return {
    'Access-Control-Allow-Origin': '*'
    }
  }
  
  export const getUrlParameter = function () {
    let obj = {}
    let reg = /([^?=&]+)=([^?=&#]+)/g
    window.location.href.replace(reg, function () {
      obj[arguments[1]] = arguments[2]
    })
    return obj
  }