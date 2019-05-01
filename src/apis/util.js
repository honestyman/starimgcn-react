export function getHeaders() {
    let token;
    if (getUrlParameter()["token"]) {
        window.localStorage.setItem(
            "token",
            decodeURIComponent(getUrlParameter()["token"])
        );
        token = decodeURIComponent(getUrlParameter()["token"]);
    } else {
        token = window.localStorage.getItem("token");
    }
    let headers = {
        Accept: "application/json;charset=UTF-8",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        // "Origin": "http://127.0.0.1:5000"
        token: token
    };
    return headers;
}

export const getUrlParameter = function() {
    let obj = {};
    let reg = /([^?=&]+)=([^?=&#]+)/g;
    window.location.href.replace(reg, function() {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
};
