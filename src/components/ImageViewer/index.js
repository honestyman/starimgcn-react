import React,{Component} from 'react';
import ReactDom from 'react-dom';
import './index.scss';
// 图片大图预览
class ImageViewerBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            img_url: props.img_url ? props.img_url : 'https://starimg.cn/loading.gif'
        };
        // 网页根节点下创建一个 div 节点
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }

    componentWillUnmount() {
        document.body.removeChild(this.container);
    }

    render() {
        const { top, left, width, height } = this.props;
        const style= {
            top: top+'px',
            left: left+'px',
            width: width+'px',
            height: height+'px'
        };
        return ReactDom.createPortal(
            <div className='image-viewer-box'>
               <div className='image-viewer' onClick={this.props.onClose}>
                    <div className='image-box'>
                        <img src={this.state.img_url} alt="" className="img" style={style} />
                        {this.props.children}
                   </div>
               </div>
            </div>,
            this.container)
    }
}

export default  ImageViewerBox;