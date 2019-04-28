import React, { Component } from 'react'
import StarHeader from '../../components/StarHeader';

import { getStarDetail } from '../../actions/starActions'
import { STAR_FETCH_SUCCESS} from '../../actionTypes/starActionTypes'
import store from '../../store'

import StarTabs from '../../components/StarTabs'
import './index.scss'
export default class Star extends Component { 
    constructor(props, context) {
        super(props, context)
        const { domain } = props.match.params
        this.clientWidth = window.innerWidth
        this.pre_index = 1;
        this.state = {
            domain: domain,
            star: null,
            ins_count: 0,
            wb_count: 0,
            itemIndex: 1,
            open: false,
            type_name: 'Ins 图片',
            sort_by: 'time_desc',
        }
        this.handleItemChange = this.handleItemChange.bind(this)
        this.hanleSortBy = this.hanleSortBy.bind(this)
    }

    /**
     * 监测 tab 的变化
     * @param {activeIndex} param0 
     */
    handleItemChange( activeIndex ) {
        let type_name = 'Ins 图片';
        switch (activeIndex) {
            case 0:
                type_name = '微博图片';
                break;
            case 1:
                type_name = 'Ins 图片';
                break;
            case 2:
                type_name = '其他图片';
                break;
            default:
                type_name ='Ins 图片'
        }
        if (this.pre_index !== activeIndex) {
            this.pre_index = activeIndex;
            this.setState(prevState => ({
                itemIndex: activeIndex ,
                type_name: type_name,
                current_page: 1
            }));
            // this.getPins(this,1,this.state.sort_by,activeIndex);
        }
    }

    /**
     * pins 排序
     * @param {tme,like} type 
     * @param {time_desc,timeasc,like_desc,like_asc} sort 
     */
    hanleSortBy(type,sort) { 

    }
    componentWillReceiveProps() { 

    }

    componentDidMount() { 
        store.dispatch(getStarDetail('/star/' + this.state.domain)).then(res => { 
            if (res.action_type === STAR_FETCH_SUCCESS) { 
                const { star,ins_count,wb_count } = store.getState().star;
                this.setState({
                    star: star,
                    ins_count: ins_count,
                    wb_count: wb_count
                })
            }
        })
    }
    
    componentWillUnmount() { 

    }
    render() { 
        return (
            <div className="star_header">
                {this.state.star ?
                    <StarHeader
                        {...this.state.star}
                        ins_count={this.state.ins_count}
                        wb_count={this.state.wb_count}
                        clientWidth={this.clientWidth}
                /> :null
                }
                <StarTabs
                    clientWidth={this.clientWidth}
                    itemIndex={this.state.itemIndex}
                    handleItemChange={this.handleItemChange}
                />
            </div>
        )
    }
}