import React,{Component} from "react";
import { Card,Box,Avatar,Link,Text} from 'gestalt';
// import FontAwesomeIcon from "react-fontawesome";

export default class StarItem extends Component {

    render() {
        return (
            <div className={'starItem'} key={this.props.data.id}>
                <Box paddingX={2} paddingY={2}  shape={'rounded'} color={'white'}>
                    <Card
                        paddingX={3}
                        paddingY={2}
                    >
                        <Box display="flex" direction="row" paddingY={2} marginTop={1} color={'white'} >
                            <Box column={2}>
                                <Link href={this.props.data.domain} target={'blank'}>
                                    <Avatar name={this.props.data.name} src={this.props.data.avatar} verified={this.props.data.verified} />
                                </Link>
                            </Box>
                            <Box column={10} paddingX={2}>
                                <Text color={'gray'} align={'left'} truncate size="xs" >
                                    <Link href={this.props.data.domain} target={'blank'}>{this.props.data.name}</Link>
                                </Text>

                                <Box color="white" paddingY={2} alignSelf={'center'}>
                                    <Box width={24} display={(this.props.data.wb_domain || this.props.data.wb_id) ? 'inlineBlock' : 'none'}>
                                        <Link href={'https://weibo.com/'+(this.props.data.wb_domain ? this.props.data.wb_domain : 'u/'+this.props.data.wb_id)} target={'blank'}>
                                            {/* <FontAwesomeIcon
                                                className={'f-brand'}
                                                name={'weibo'}
                                                size={'2x'}
                                            /> */}
                                            <Avatar name={'Weibo'} />
                                        </Link>
                                    </Box>
                                    <Box width={24} display={this.props.data.ins_name? 'inlineBlock' : 'none'} marginLeft={2}>
                                        <Link href={'https://instagram.com/'+(this.props.data.ins_name )} target={'blank'}>
                                            <Avatar name={'Instagram'} />
                                            {/* <FontAwesomeIcon
                                                className={'f-brand'}
                                                name={'instagram'}
                                                size={'2x'}
                                            /> */}
                                        </Link>
                                    </Box>
                                    <Box width={24} display={this.props.data.fb_domain? 'inlineBlock' : 'none'} marginLeft={2}>
                                        <Link href={'https://facebook.com/'+(this.props.data.fb_domain )} target={'blank'}>
                                            <Avatar name={'Instagram'} />
                                            {/* <FontAwesomeIcon
                                                className={'f-brand'}
                                                name={'facebook'}
                                                size={'2x'}
                                            /> */}
                                        </Link>
                                    </Box>
                                </Box>

                                <Text color={'darkGray'} align={'left'} truncate size="xs">{this.props.data.description}</Text>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </div>
        );
    }
}