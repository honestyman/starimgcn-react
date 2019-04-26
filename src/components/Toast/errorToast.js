import { Toast,Box } from 'gestalt';
import React, { Component} from 'react'
import { clearTimeout } from 'timers';
import ReactDom from 'react-dom';

export default class ErrorToast extends Component{ 
    constructor(props) { 
        super(props);
        this.state = {
            showTaost: props.showTaost ? props.showTaost : false
        }
        this.timer = null
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }
    componentDidMount() {
        let that = this;
        this.timer = setTimeout(() => { 
            that.setState({
                showTaost: false
            })
        })
    }
    componentWillUnmount() { 
        clearTimeout(this.timer)
        document.body.removeChild(this.container);
    }

    render() { 
        return (
          ReactDom.createPortal(
            <div className='modal'>
                <Box>
                    {this.state.showTaost?(
                        <Toast color="orange" text={this.props.text ? this.props.text : '哦，好像哪里出错了！'}></Toast>
                    ) : null}
                </Box>
            </div>,
            this.container
          )
        )
    }
}