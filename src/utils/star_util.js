import { SHOW_TOAST, CLOSE_TOAST } from "../actionTypes/commonActionTypes";
import { TOGGLE_TOAST } from "../actions/commonActions";
import store from "../store";

//滚动条在Y轴上的滚动距离
export function getScrollTop(){
    let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
//文档的总高度
export function getScrollHeight(){
    let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
//浏览器视口的高度
export function getWindowHeight(){
    let windowHeight = 0;
    if(document.compatMode === "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

export function showToast(text) {
    store.dispatch(TOGGLE_TOAST(SHOW_TOAST,text))
}

export function closeToast() { 
    store.dispatch(TOGGLE_TOAST(CLOSE_TOAST))
}