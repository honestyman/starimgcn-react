import React, { Component } from 'react'
import StarHeader from '../../components/StarHeader';

import { getStarDetail } from '../../actions/starActions'
import { STAR_FETCH_SUCCESS} from '../../actionTypes/starActionTypes'
import store from '../../store'

import './index.scss'
export default class Star extends Component { 
    constructor(props, context) {
        super(props, context)
        const { domain } = props.match.params
        this.clientWidth = window.innerWidth
        this.state = {
            domain: domain,
            star: null,
            ins_count: 0,
            wb_count: 0
        }
    }

    componentWillReceiveProps() { 

    }

    componentDidMount() { 
        console.log(this.state.domain);
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
            </div>
        )
    }
}