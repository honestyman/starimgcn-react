import React, { Component } from 'react'
import { Sticky, Box, Divider, Text, Icon, Link} from 'gestalt'
import './index.scss'
export default class MobileHeader extends Component { 
    render() { 
        return (
            <div className="mobile_header">
                <div class="top_header">
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
                            <Box marginRight={1} padding={1} flex="grow" alignContent="left">
                                <Link href="/">
                                   <Icon icon="pinterest" accessibilityLabel="Home" color="midnight" size="23" /> 
                                </Link>
                            </Box>
                            <Box marginRight={1} padding={1} flex="grow">
                                <Link href="/search">
                                    <Icon icon="search" accessibilityLabel="Search" color="midnight" size="23" />
                                </Link>
                            </Box>
                            <Box marginRight={1} padding={1} flex="grow">
                                <Link href="/collect">
                                    <Icon icon="heart" accessibilityLabel="Collect" color="midnight" size="23" />
                                </Link>
                            </Box>
                            <Box marginRight={1} padding={1} flex="grow" alignContent="right" className="test">
                                <Link href="/user">
                                    <Icon icon="person" accessibilityLabel="Person" color="midnight" size="23" />
                                </Link>
                            </Box>
                        </Box>
                    </Sticky>
                </div>
            </div>
        )
    }
}