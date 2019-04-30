export function getHeaders () {
  return {
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