import React, { Component} from "react";
import { Text,Box,Button,Sticky,Divider} from 'gestalt';
import SearchBox from '../WebSaarchBox'
import { NavLink} from 'react-router-dom'
// import { IconButton } from 'gestalt';

import './index.scss';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.searchInputChange = this.searchInputChange.bind(this);
    }
    searchInputChange(e){
        this.setState({
            value : e.target.value
        })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render(){
        return (
            <Sticky top={0} dangerouslySetZIndex={{ __zIndex: 671 }}>
                <div className='web_header'>
                    <Box color="white" shape="rounded" paddingX={8} paddingY={3} display="flex" direction="row" alignItems="center">
                        <Box padding={2}>
                            <NavLink to="/">
                                <Text bold>starImg</Text>
                            </NavLink>
                        </Box>
                        <Box flex="grow" paddingX={2}>
                            <SearchBox />
                        </Box>
                        <Box paddingX={2} shape={'pill'} marginLeft={-2} marginRight={1}>
                            <NavLink to='/'>
                                <Button color="white" text={'首页'}/>
                            </NavLink>
                        </Box>
                        <Box paddingX={2} shape={'pill'} marginLeft={-2} marginRight={-2}>
                            <NavLink to='/explore' activeClassName="selected">
                                <Button color="white" text={'发现'}/>
                            </NavLink>
                        </Box>
                    </Box>
                </div>
                <Divider />
            </Sticky>
        )
    }
}

export default Header