import React, { PureComponent } from 'react'
import { Sticky, Box, Divider, Text, Icon} from 'gestalt'
import { NavLink } from 'react-router-dom'

import './index.scss'

export default class MobileHeader extends PureComponent { 
    render() { 
        return (
            <div className="mobile_header">
                <div className="top_header">
                    <Sticky top={0} dangerouslySetZIndex={{ __zIndex: 671 }}>
                        <Box color="white" shape="rounded" paddingX={8} paddingY={3}>
                            <Text bold align="center">StarImg</Text>
                        </Box>
                        <Divider />
                    </Sticky>
                </div>
                <div className="bottom_header">
                    <Divider />
                    <Sticky bottom={0} dangerouslySetZIndex={{ __zIndex: 671 }}>
                        <Box color="white" shape="rounded" paddingX={4} paddingY={2} display="flex" direction="row" alignItems="center">
                            <Box marginRight={1} padding={1} flex="grow">
                                <NavLink to="/" replace>
                                   <Icon icon="apps" accessibilityLabel="Home" color="midnight" size="23" /> 
                                </NavLink>
                            </Box>
                            <Box marginRight={1} padding={1} flex="grow">
                                <NavLink to="/explore" activeClassName="selected" replace>
                                    <Icon icon="compass" accessibilityLabel="Search" color="midnight" size="23" />
                                </NavLink>
                            </Box>
                            <Box marginRight={1} padding={1} flex="grow">
                                <NavLink to="/collect" activeClassName="selected">
                                    <Icon icon="heart" accessibilityLabel="Collect" color="midnight" size="23" />
                                </NavLink>
                            </Box>
                            <Box marginRight={1} padding={1} flex="grow">
                                <NavLink to="/user" activeClassName="selected">
                                    <Icon icon="person" accessibilityLabel="Person" color="midnight" size="23" />
                                </NavLink>
                            </Box>
                        </Box>
                    </Sticky>
                </div>
            </div>
        )
    }
}
