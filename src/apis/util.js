export function getHeaders() {
	let headers = {
		"Accept": "application/json;charset=UTF-8",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Origin": "http://127.0.0.1:5000"
	}
	if (process.env.NODE_ENV === 'development') {
		return headers
	} else { 
		return Object.assign(headers, {"Origin": "http://test.starimg.cn"});
	}
	
}

export const getUrlParameter = function () {
	let obj = {};
	let reg = /([^?=&]+)=([^?=&#]+)/g;
	window.location.href.replace(reg, function () {
		obj[arguments[1]] = arguments[2];
	});
	return obj;
};