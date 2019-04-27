// import 'babel-polyfill';
import React, { Component } from 'react';
import { Masonry,Box,Spinner} from 'gestalt';
import Pin from '../PinItem';
import store from '../../store';
import { getRecentImages } from '../../actions/imageActions';
import * as until from '../../utils/window_util'
import './index.scss';
// import { HOME_FETCH_FAIL, HOME_FETCH_SUCCESS} from '../../actionTypes/imageActionTypes'

export default class PinsContail extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.url = '/getRecentImages';
        this.winWidth = document.documentElement.clientWidth;
        this.state = {
            data: [],
            last_page:1,
            show_spinner:false,
            current_page: 0,
            isFetching: false
        };
    }
    // 在第一次渲染后调用，只在客户端。
    // 你应该在 componentDidMount 生命周期方法内发送 AJAX 请求数据。
    // 这样你才能够在请求的数据到达时使用 setState 更新你的组件。
    componentDidMount() {
        this.updatePins();
        let _this = this;
        window.addEventListener('scroll', () => {
            _this.handleScroll();
        });
    }
    // 距离底部30px时，加载更多内容
    handleScroll() {
        let scrollTop = until.getScrollTop();
        let scrollHeight = until.getScrollHeight();
        let windowHeight = until.getWindowHeight();
        if ((scrollTop + windowHeight + 30 > scrollHeight) && !this.state.isFetching) {
            this.updatePins()
        }
    }
    // get pins
    updatePins() { 
           this.setState({
                isFetching: true,
                show_spinner: true
            })
            store.dispatch(getRecentImages(this.url, this.state.current_page + 1))
                .then((res) => {
                    const state = store.getState().pins;
                    this.setState({
                        ...state,
                        show_spinner:false
                    })
                }).catch(error => { 
                    console.log(error);
                    this.setState({
                        show_spinner:false
                    })
                })
    }
    componentWillUnmount() { 
        clearTimeout(this.timer);
    }
    render() {
        return (
            <div className="pinsContainer">
                <Box paddingX={this.winWidth > 768 ? 8 : 2} marginTop={3}>
                    <Masonry
                        comp={Pin}
                        items={this.state.data}
                        loadItems={(event)=>{}}
                        minCols={2}
                        gutterWidth = {5}
                        flexible = {true}
                    />
                    <Box marginBottom={6}>
                        <Spinner accessibilityLabel={'Load more Pins'} show={this.state.show_spinner}/>
                    </Box>
                </Box>
            </div>
        );
    }
}