// import 'babel-polyfill';
import React, { Component } from 'react';
import { Masonry,Box,Spinner,Text,Divider} from 'gestalt';
import StarItem from '../../components/StarItem';
import store from '../../store';
import { getStarLists } from '../../actions/starsActions';
import * as until from '../../utils/window_util'
// import { HOME_FETCH_FAIL, HOME_FETCH_SUCCESS} from '../../actionTypes/imageActionTypes'

export default class StarListContainer extends Component {
    constructor(props) {
        super(props);
        this.winWidth = document.documentElement.clientWidth;
        this.state = {
            data: [],
            last_page:2,
            show_spinner:false,
            current_page: 0,
            isFetching: false,
        };
    }

    // 在第一次渲染后调用，只在客户端。
    // 你应该在 componentDidMount 生命周期方法内发送 AJAX 请求数据。
    // 这样你才能够在请求的数据到达时使用 setState 更新你的组件。
    componentDidMount() {
        this.updateStars();
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
        store.dispatch(getStarLists('/getStars', this.state.current_page + 1))
            .then((res) => {
                const state = store.getState().stars;
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
    
    }
    render() {
        return (
            <div className='starsContainer'>
                <Box display='flex' justifyContent='center'>
                    <Box column={this.winWidth > 768 ? 8 : 12} paddingX={this.winWidth > 768 ? 8 : 2} marginTop={3} alignContent='center'>
                        <Box paddingY={2} paddingX={2} marginTop={this.winWidth>768 ? 0 : 10 }>
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