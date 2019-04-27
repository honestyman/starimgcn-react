import React, { Component } from 'react'
import { Box, Link, Avatar, Text } from 'gestalt'

export default class SatrCardProfile extends Component { 
    shouldComponentUpdate() { 
        return false;
    }
    render() { 
        return (
            <Box display="flex" direction="row" paddingX={1} paddingY={1} marginTop={1} color={'white'} alignItems="center">
                <Box column={2}>
                    <Link href={this.props.domain} target={'blank'}>
                        <Box>
                            <Avatar name={this.props.name} src={this.props.avatar} verified={this.props.verified} />
                        </Box>
                    </Link>
                </Box>
                <Box column={10} paddingX={2}>
                    <Link href={'https://starimg.cn/pin/'+this.props.id} target={'blank'} className={'PinLayer'}>
                        <Text color={'darkGray'} align={'left'} truncate size="xs">{this.props.description}</Text>
                    </Link>
                    <Text color={'gray'} align={'left'} truncate size="xs" >
                        <Link href={this.props.domain} target={'blank'}>{this.props.name}</Link>
                    </Text>
                </Box>
            </Box>
        )
    }
}