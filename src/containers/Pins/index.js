import React, { Component } from 'react';
import { Masonry,Box,Spinner} from 'gestalt';
import Pin from '../../components/PinItem';
import store from '../../store';
import { getPins } from '../../actions/pinsActions';
import * as until from '../../utils/star_util'
import './index.scss';
import { PINS_FETCH_FAIL, PINS_FETCH_SUCCESS } from '../../actionTypes/pinsActionTypes'
export default class PinsContail extends Component {
    constructor(props) {
        super(props);
        this.winWidth = document.documentElement.clientWidth;
        this.state = {
            data: [],
            last_page:1,
            show_spinner:false,
            current_page: 0,
            isFetching: false,
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    // 在第一次渲染后调用，只在客户端。
    // 你应该在 componentDidMount 生命周期方法内发送 AJAX 请求数据。
    // 这样你才能够在请求的数据到达时使用 setState 更新你的组件。
    componentDidMount() {
        this.updatePins();
        window.addEventListener('scroll',this.handleScroll);
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
       // 首次加载完内容检测是否达到滚动标准
    // 没有的话就继续加载一次
    isCanScroll() { 
        let scrollHeight = until.getScrollHeight();
        let windowHeight = until.getWindowHeight();
        if (!(scrollHeight > windowHeight)) { 
            this.updatePins()
        }
    }
    // get pins
    updatePins() { 
        this.setState({
            isFetching: true,
            show_spinner: true,
        })
        if (!store) { 
            return false;
        }
        store.dispatch(
            getPins('home', this.state.current_page + 1))
            .then((res) => {
                if (res.action_type === PINS_FETCH_SUCCESS) {
                    const state = store.getState().pins;
                    this.setState({
                        ...state,
                        show_spinner: false
                    }, () => { 
                        this.isCanScroll()
                    })
                } else if (res.action_type === PINS_FETCH_FAIL) { 
                    console.log(res.message)
                }
              
            }).catch(error => { 
                console.log(error);
                this.setState({
                    show_spinner:false
                })
            })
    }
    componentWillUnmount() { 
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        return (
            <div className="pinsContainer">
                <Box paddingX={this.winWidth > 768 ? 8 : 2} marginTop={2}>
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