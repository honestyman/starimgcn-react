import React, { Component } from 'react';
import { connect} from 'react-redux'
import WebHeader from '../../components/WebHeader'
import MobileHeader from '../../components/MobileHeader'
import store from '../../store';
import { SEARCH_FETCH_REQUEST,SEARCH_FETCH_SUCCESS,SEARCH_FETCH_FAIL} from '../../actionTypes/searchActionTypes'
import { searchStar } from '../../actions/searchStarActions'

function mapStateToProps(state, ownProps) { 
    return {
        ...store.getState().search
    }
}

function mapDispitchToprops(dispatch,ownProps) { 
    return {
        handleChange: searchByKey
    }
}
function searchByKey(key) { 
    if ( key.length >= 2) { 
        store.dispatch(searchStar('/searchStar', key)).then(res => { 
            console.log(res.data);
        })
    }
}
class Header extends Component { 

    constructor(props) {
        super(props)
        console.log(props);
        this.isMobile = window.innerWidth <= 768;
    }
                                                                                                                                                                             
    
    componentDidMount() {
        window.addEventListener('resize', this.mobileDetect, false);
    }
    
    mobileDetect = () => {
        this.isMobile = window.innerWidth <= 768
    };

    render() { 
        return (
            this.isMobile ? <MobileHeader handleChange={this.props.handleChange} /> : <WebHeader handleChange={this.props.handleChange} />
        )
    }
    
}

export default connect(mapStateToProps,mapDispitchToprops)(Header)