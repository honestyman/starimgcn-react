import React, { Component} from "react";
import { Text,Box,Button,Link,Sticky,Divider} from 'gestalt';
import SearchBox from '../WebSaarchBox'
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
                <div className={'header'}>
                    <Box color="white" shape="rounded" paddingX={8} paddingY={3} display="flex" direction="row" alignItems="center">
                        <Box padding={2}>
                            <Link href="/">
                                <Text bold>starImg</Text>
                            </Link>
                        </Box>
                        <Box flex="grow" paddingX={2}>
                          <SearchBox />
                        </Box>
                        <Box paddingX={2} shape={'pill'} marginLeft={-2} marginRight={-2}>
                            <Link href={'/'}>
                                <Button color="white" text={'首页'}/>
                            </Link>
                        </Box>
                        <Box paddingX={2} shape={'pill'} marginLeft={-2} marginRight={-2}>
                            <Link href={'/explore'}>
                                <Button color="white" text={'坑现'}/>
                            </Link>
                        </Box>
                        {/*<Box paddingX={2}>*/}
                        {/*<IconButton accessibilityLabel="Profile" icon="person" size="md" />*/}
                        {/*</Box>*/}
                    </Box>
                    <Divider />
                </div>
            </Sticky>
        )
    }
}

export default Header