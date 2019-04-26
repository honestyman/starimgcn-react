import React,{Component} from "react";
import { Image,Card,Box,Avatar,Link,Icon, Text} from 'gestalt';
import { BOX_COLOR} from '../../constants'
import ImageViewerBox from './ImageViewerBox';

const imageColor = BOX_COLOR;
let page_type = document.getElementsByTagName('meta')['page-type'].getAttribute('content');
class Pin extends Component {
    constructor(props) {
        super(props);
        this.item = props.data;
        this.itemIdx = props.itemIdx > 10 ? parseInt(props.itemIdx % 10) : props.itemIdx;
        this.clientWidth = document.documentElement.clientWidth;
        this.state = {
            hovered: false,
            src: 'https://wx3.sinaimg.cn/orj360/4a47f46cly1fu2j0ki4pfj22kw3vckjn.jpg',
            page_type: page_type ? page_type : 'normal',
            show_image: false,
            img_props: {}
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.showImageViewer = this.showImageViewer.bind(this);
        this.closeImageViewer = this.closeImageViewer.bind(this);
    }
    showImageViewer(){
        let width = this.item.origin === '微博' ? (this.item.pic_detail.large  ?
            this.item.pic_detail.large.geo.width : (this.item.pic_detail.geo ? this.item.pic_detail.geo.width : 360)) :
                    (this.item.pic_detail ? this.item.pic_detail[0].config_width : 120);
        let height =this.item.origin === '微博' ? (this.item.pic_detail.large  ?
            this.item.pic_detail.large.geo.height : (this.item.pic_detail.geo ? this.item.pic_detail.geo.height : 540)):
            (this.item.pic_detail ? this.item.pic_detail[0].config_height : 120);
   
        let windowHeight = document.compatMode === "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
        let winWidth = window.innerWidth ? window.innerWidth : document.body.clientWidth
    
        width = height>windowHeight ? windowHeight/height*width : width;
        let top = height<windowHeight ? (windowHeight-height)/2 : 0;
        this.setState({
            show_image: true,
            img_props: {
                top: top,
                width: width,
                height: height>windowHeight ? windowHeight : height,
                left: ((winWidth-width)/2).toFixed(2),
                img_url: this.item.origin === '微博' ? (this.item.pic_detail ? this.item.pic_detail.large.url : this.item.display_url)
                    :(this.item.cos_url ?  'https://star-1256165736.picgz.myqcloud.com/'+this.item.cos_url : this.item.display_url)
            }
        })
    };
    closeImageViewer(){
        this.setState({show_image: false})
    };

    handleMouseEnter(){
        this.setState({
            hovered: this.clientWidth > 768
        })
    }
    handleMouseLeave(){
        this.setState({ hovered: false });
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.data.id !== this.item.id;
    }

    render() {
        const style = {
            clear:'both',
            overflow:'hidden',
            width:'100%',
        };
        return (
            <div style={style} className={'pinItem'} key={this.item.id}>
                <Box paddingX={2} paddingY={2}  shape={'rounded'} color={'white'}>
                    <Card
                        paddingX={3}
                        paddingY={2}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        >
                        <Box shape={'rounded'} color={'white'}>
                            <div className={'pinImage'} onClick={this.showImageViewer}>
                                <Image
                                    alt={this.item.text}
                                    // fit="cover"
                                    color = {imageColor[this.itemIdx]}
                                    naturalWidth={ this.item.origin === '微博' ? (this.item.pic_detail.geo  ? this.item.pic_detail.geo.width : 360) :
                                        (this.item.pic_detail ? this.item.pic_detail[0].config_width : 120)   }
                                    naturalHeight={this.item.origin === '微博' ? (this.item.pic_detail.geo  ?
                                        (this.item.pic_detail.geo.height>1200 ? 1200 : this.item.pic_detail.geo.height) : 540) :
                                        (this.item.pic_detail ? this.item.pic_detail[0].config_height : 120)}
                                    src={this.item.origin === '微博' ? (this.item.pic_detail ?
                                        this.item.pic_detail.url :this.item.display_url) :
                                        ('https://star-1256165736.picgz.myqcloud.com/'+this.item.cos_url+'!small')}
                                >
                                    <Box paddingX={3} paddingY={1} position={'absolute'} bottom={true} left={true} shape={'rounded'} color={'white'} marginLeft={3} marginBottom={3} display={this.state.hovered ? 'block' : 'none'}>
                                        <Link href={this.item.origin == '微博' ? this.item.origin_url : 'https://instagram.com/p/'+this.item.code}>
                                            <Box alignItems="center" display="flex">
                                                <Box marginRight={1} padding={1}>
                                                    <Icon icon="arrow-up-right" accessibilityLabel="link" color="darkGray" inline={true}/>
                                                </Box>
                                                <Text align="center" bold color="darkGray">
                                                    {this.item.origin === '微博' ? 'weibo.com' : 'instagram.com'}
                                                </Text>
                                            </Box>
                                        </Link>
                                    </Box>
                                </Image>
                            </div>
                        </Box>
                        {
                            this.state.page_type && this.state.page_type ==='normal' ?
                                <Box display="flex" direction="row" paddingY={2} marginTop={1} color={'white'} >
                                    <Box column={2}>
                                        <Link href={this.item.domain} target={'blank'}>
                                            <Avatar name={this.item.name} src={this.item.avatar} verified={this.item.verified} />
                                        </Link>
                                    </Box>
                                    <Box column={10} paddingX={2}>
                                        <Link href={'https://starimg.cn/pin/'+this.item.id} target={'blank'} className={'PinLayer'}>
                                            <Text color={'darkGray'} align={'left'} truncate size="xs">{this.item.description}</Text>
                                        </Link>
                                        <Text color={'gray'} align={'left'} truncate size="xs" >
                                            <Link href={this.item.domain} target={'blank'}>{this.item.name}</Link>
                                        </Text>
                                    </Box>
                                </Box>
                                : null
                        }

                    </Card>
                </Box>
                {this.state.show_image && (
                    <ImageViewerBox
                        onClose={this.closeImageViewer}
                        img_url={this.state.img_props.img_url}
                        top={ this.state.img_props.top}
                        left={this.state.img_props.left}
                        width={this.state.img_props.width}
                        height={this.state.img_props.height}
                    />
                )}
            </div>
        );
    }
}

export default Pin;