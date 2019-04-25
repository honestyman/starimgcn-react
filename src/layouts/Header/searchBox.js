import React, { Component} from "react";
import { SearchField } from 'gestalt';

export default class SearchBox extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            value: ''
        }
        this.input = null;
    }
    componentDidMount() { 
        console.log(this.state.value)
    }
    render() { 
        return (
            <div className={'searchBox'}>
                <SearchField
                    accessibilityLabel="Demo Search Field"
                    id="searchField"
                    onChange={({ value, input }) => { this.setState({ value }); this.input = input }}
                    placeholder="Search and explore,now no word"
                    value={this.state.value}
                    onBlur={({ event }) => { console.log(event)}}
                />
        </div>
        )
    }
}