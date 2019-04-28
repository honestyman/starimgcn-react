// 获取url 后参数
exports.getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var u = decodeURIComponent(window.location.search)
        .substr(1)
        .match(reg);
    if (u != null) {
        return unescape(u[2]);
    }
    return null;
};

// 获取urlencode 参数值
exports.getEncodeVal = function(str, name) {
    var r = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var t = str.match(r);
    if (t != null) {
        return unescape(t[2]);
    }
    return null;
};

// 获取cookie
exports.getCookie = function(name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (document.cookie.match(reg)) {
        arr = document.cookie.match(reg);
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
};

// 去空格
exports.trim = function(str, isG) {
    var reg = isG ? /\s/g : /(^\s+)|(\s+$)/g;
    return str.replace(reg, "");
};

// 验证手机号
exports.isTelPhone = function(tel) {
    var regPhone = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!regPhone.test(tel)) {
        return false;
    } else {
        return true;
    }
};

exports.getDateStr = function(params) {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let nowDay = `${year}/${month}/${day}`;
    let nowTimeStr = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;
    if (params) {
        return nowDay;
    } else {
        return nowTimeStr;
    }
};

// 标准时间转换日期
exports.formatUTCDate = function(time) {
    let Year = time.getFullYear();
    let Month =
        time.getMonth() + 1 > 10
            ? time.getMonth() + 1
            : "0" + (time.getMonth() + 1);
    let Day = time.getDate() > 10 ? time.getDate() : "0" + time.getDate();
    return `${Year}-${Month}-${Day}`;
};

// localStorage set expireTime
exports.setLocalStorage = function(name, value, expireName, expireTime) {
    const expiration = new Date().getTime() + 3600 * 1000 * 24 * expireTime;
    localStorage.setItem(name, value);
    localStorage.setItem(expireName, expiration.toString());
};

exports.getLocalStorage = function(name, expireName) {
    const nowTime = new Date().getTime();
    const expireTime = localStorage.getItem(expireName);
    const storageName = localStorage.getItem(name);
    if (nowTime > parseInt(expireTime)) {
        localStorage.removeItem(name);
        localStorage.removeItem(expireName);
        return null;
    } else {
        return storageName;
    }
};
