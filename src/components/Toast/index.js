import { Toast,Box } from 'gestalt';
import React, { Component} from 'react'
import { clearTimeout } from 'timers';
import ReactDom from 'react-dom';

export default class StarToast extends Component{ 
    constructor(props) { 
        super(props);
        this.state = {
            showTaost: props.showTaost ? props.showTaost : false,
            text: props.text ? props.text : ''
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
                        <Toast color="orange" text={this.state.text ? this.state.text : '咦，好像哪里出错了！'}></Toast>
                    ) : null}
                </Box>
            </div>,
            this.container
          )
        )
    }
}