// import 'babel-polyfill';
import React, { Component } from 'react';
import { Masonry,Box,Spinner,Text,Divider} from 'gestalt';
import StarItem from '../../components/StarItem';
import store from '../../store';
import { getStarLists } from '../../actions/starsActions';
import * as until from '../../utils/star_util'
import { STARS_FETCH_FAIL, STARS_FETCH_SUCCESS } from '../../actionTypes/starsActionTypes'

import SearchBox from '../../components/WebSaarchBox'
import './index.scss'
export default class StarListContainer extends Component {
    constructor(props) {
        super(props);
        this.winWidth = document.documentElement.clientWidth;
        this.timer = null;
        this.state = {
            data: [],
            last_page:2,
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
        this.updateStars();
        window.addEventListener('scroll', this.handleScroll);
        
    }
    // 首次加载完内容检测是否达到滚动标准
    // 没有的话就继续加载一次
    isCanScroll() { 
        let scrollHeight = until.getScrollHeight();
        let windowHeight = until.getWindowHeight();
        if (!(scrollHeight > windowHeight)) { 
            this.updateStars()
        }
    }
    // 距离底部30px时，加载更多内容
    handleScroll() {
        let scrollTop = until.getScrollTop();
        let scrollHeight = until.getScrollHeight();
        let windowHeight = until.getWindowHeight();
        if ((scrollTop + windowHeight + 30 > scrollHeight) && !this.state.isFetching) {
            if (this.state.last_page >= this.state.current_page) {
                this.updateStars()
            }
        }
    }
    // get pins
    updateStars() { 
        this.setState({
            isFetching: true,
            show_spinner: true,
        })
        store.dispatch(getStarLists(this.state.current_page + 1))
            .then((res) => {
                if (res.action_type === STARS_FETCH_SUCCESS) {
                    const state = store.getState().stars;
                    if (this.state.data.length === state.data.length) { 
                        // 加载完毕提醒
                        until.showToast('没有更多了哦！')
                        this.timer = setTimeout(() => { 
                            until.closeToast()
                        },2000)
                    }
                    this.setState({
                        ...state,
                        show_spinner: false
                    }, () => {
                        this.isCanScroll()
                    })
                } else if(res.action_type === STARS_FETCH_FAIL){ 
                    this.setState({
                        show_spinner: false
                    })
                    // 加载错误提醒
                    until.showToast('异步加载数据出错。。。')
                    this.timer = setTimeout(() => { 
                        until.closeToast()
                    },2000)
                }
             
            }).catch(error => { 
                console.log(error);
                this.setState({
                    show_spinner: false
                });
                 // 加载错误提醒
                 until.showToast('异步加载数据出错。。。')
                 this.timer = setTimeout(() => { 
                     until.closeToast()
                 },2000)
            })
    }
    componentWillUnmount() { 
        window.removeEventListener('scroll',this.handleScroll)
        clearTimeout(this.timer)
    }
    render() {
        return (
            <div className='starsContainer'>
                {/* <SearchBox /> */}
                <Box display='flex' justifyContent='center'>
                    <Box column={this.winWidth > 768 ? 8 : 12} paddingX={this.winWidth > 768 ? 8 : 2} marginTop={3} alignContent='center'>
                        <Box paddingY={2} paddingX={2}>
                           <Text size='md'>收录明星列表</Text> 
                         </Box>
                        <Divider />
                         <Masonry
                            comp={StarItem}
                            items={this.state.data}
                            loadItems={(event)=>{}}
                            minCols={1}
                            gutterWidth = {5}
                            flexible = {true}
                        />
                        <Box marginBottom={6}>
                            <Spinner accessibilityLabel={'Load more Pins'} show={this.state.show_spinner}/>
                        </Box>
                    </Box>
                </Box>
            </div>
        );
    }
}