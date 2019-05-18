import React, { Component} from "react";
import { SearchField,Box } from 'gestalt';
import { searchStar } from '../../actions/searchStarActions'

import store from '../../store'


function ResultList(props) { 
    return (
        <Box paddingX={2} paddingY={1} display="none">
            <ul className="star_list">

            </ul>
        </Box>
    );
}
export default class SearchBox extends Component { 
    constructor(props) { 
        super(props);
        console.log(props);
        this.state = {
            value: '',
            isFetching: false
        }
        this.requestStatus = 'request'
        this.input = null;
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() { 
        // console.log(this.state.value)
    }
    handleChange(key) { 
        console.log(key)
        if (this.requestStatus !== 'requesting' && key.length >= 2) { 
            this.requestStatus = 'requesting'
            store.dispatch(searchStar('/searchStar', key)).then(res => { 
                console.log(res.data);
            })
        }
    }
    render() { 
        return (
            <div className={'searchBox'}>
                <SearchField
                    accessibilityLabel="Demo Search Field"
                    id="searchField"
                    onChange={
                        ({ value}) => {
                            this.setState({ value });
                            this.handleChange(value)
                        }}
                    placeholder="输入你想 pick 的 star 的名字"
                    value={this.state.value}
                    onBlur={({ event }) => { console.log('----'+event.target.value)}}
                />
                <ResultList />
        </div>
        )
    }
}