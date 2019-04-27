import React,{Component} from "react";
import { Image,Card,Box,Link,Icon, Text} from 'gestalt';
import { BOX_COLOR} from '../../constants'
import ImageViewerBox from '../ImageViewer';
import SatrCardProfile from '../StarCardProfile'
import './index.scss';

const imageColor = BOX_COLOR;
let page_type = document.getElementsByTagName('meta')['page-type'].getAttribute('content');

/**
 * 无状态函数组件
 * 展示图片的来源
 * @param {*} props 
 */
function PinItemOrigin(props) { 
    return (
        <Box paddingX={3} paddingY={1} position='absolute' bottom={true} left={true} shape={'rounded'} color={'white'} marginLeft={3} marginBottom={3}>
            <Link href={props.origin === '微博' ? props.origin_url : 'https://instagram.com/p/'+props.code}>
                <Box alignItems="center" display="flex">
                    <Box marginRight={1} padding={1}>
                    <   Icon icon="arrow-up-right" accessibilityLabel="link" color="darkGray" inline={true}/>
                    </Box>
                    <Text align="center" bold color="darkGray">
                        {props.origin === '微博' ? 'weibo.com' : 'instagram.com'}
                    </Text>
                </Box>
            </Link>
        </Box>
    );
}
export default class Pin extends Component {
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
        
        const { domain, name, avatar, verified, id, description } = this.item
        this.starProfile = { domain, name, avatar, verified, id, description};
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.showImageViewer = this.showImageViewer.bind(this);
        this.closeImageViewer = this.closeImageViewer.bind(this);
    }
    showImageViewer() {
        let width = this.item.origin === '微博' ? (this.item.pic_detail.large ?
            this.item.pic_detail.large.geo.width : (this.item.pic_detail.geo ? this.item.pic_detail.geo.width : 360)) :
            (this.item.pic_detail ? this.item.pic_detail[0].config_width : 120);
        let height = this.item.origin === '微博' ? (this.item.pic_detail.large ?
            this.item.pic_detail.large.geo.height : (this.item.pic_detail.geo ? this.item.pic_detail.geo.height : 540)) :
            (this.item.pic_detail ? this.item.pic_detail[0].config_height : 120);
   
        let winHeight = document.compatMode === "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
        let winWidth = window.innerWidth ? window.innerWidth : document.body.clientWidth
        // 图片高度超过视窗
        let top = 0;
        if (height >= winHeight) {
            let rate = width / height;
            height = winHeight;
            width = rate* winHeight;
            top = height <= winHeight ? (winHeight - height) / 2 : 0;
        }
        if (width >= winWidth) {
            let rate = winWidth / width;
            width = winWidth;
            height = height * rate; 
            top = winHeight>height ? (winHeight-height)/2 : 0
        }
  
        let img_props = {
                top: top,
                width: width,
                height: height,
                left: ((winWidth-width)/2).toFixed(2),
                img_url: this.item.origin === '微博' ? (this.item.pic_detail ? this.item.pic_detail.large.url : this.item.display_url)
                    :(this.item.cos_url ?  'https://star-1256165736.picgz.myqcloud.com/'+this.item.cos_url : this.item.display_url)
        }
        this.setState({
            show_image: true,
            img_props: img_props
        })
    };
    closeImageViewer(){
        this.setState({show_image: false})
    };

    handleMouseEnter() {
        if(this.clientWidth > 768)  { 
            this.setState({
                hovered: true
            })
        }
    }
    handleMouseLeave(){
        this.setState({ hovered: false });
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.show_image !== nextState.show_image || this.state.hovered !== nextState.hovered) { 
            return true;
        }
        return nextProps.data.id !== this.item.id;
    }

    render() {
        return (
            <div className='pinItem' key={this.item.id}>
                <Box paddingX={2} paddingY={1}  shape={'rounded'} color={'white'}>
                    <Card
                        paddingX={3}
                        paddingY={2}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        >
                        <Box shape={'rounded'} color={'white'}>
                            <div className='pinImage' onClick={this.showImageViewer}>
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
                                    {this.state.hovered ? <PinItemOrigin
                                            origin={this.item.origin}
                                            origin_url={this.item.origin_url}
                                            code={this.item.code}
                                        /> : null
                                    }
                                </Image>
                            </div>
                        </Box>
                        {this.state.page_type && this.state.page_type ==='normal' ?
                                <SatrCardProfile {...this.starProfile}/>
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