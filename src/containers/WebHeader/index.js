import React, { Component} from "react";
import { Text, Box, Button, Sticky, Divider } from 'gestalt';
import { NavLink } from 'react-router-dom'

import SearchBox from '../../components/WebSaarchBox'
// import { IconButton } from 'gestalt';

import './index.scss';
export default class Header extends Component {

    render(){
        return (
            <Sticky top={0} dangerouslySetZIndex={{ __zIndex: 671 }}>
                <div className='web_header'>
                    <Box color="white" shape="rounded" paddingX={8} paddingY={3} display="flex" direction="row" alignItems="start">
                        {/* logo or brand */}
                        <Box padding={2}>
                            <NavLink to="/">
                                <Text bold>starImg</Text>
                            </NavLink>
                        </Box>
                        {/* search part */}
                        <Box flex="grow" paddingX={2}>
                            <SearchBox {...this.props} />
                        </Box>
                        {/* right navlink */}
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
