import { Toast,Box } from 'gestalt';
import React, { Component} from 'react'
import ReactDom from 'react-dom';

export default class StarToast extends Component{ 
    constructor(props) { 
        super(props);
        this.state = {
            showTaost: props.showTaost ? props.showTaost : false,
            text: props.text ? props.text : ''
        }
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }
    componentWillUnmount() { 
        document.body.removeChild(this.container);
    }

    render() { 
        return (
          ReactDom.createPortal(
            <div className='modal'>
                  <Box
                      display='flex'
                      alignItems="center"
                      justifyContent="center"
                      fit
                      dangerouslySetInlineStyle={{
                        __style: {
                          bottom: 250,
                          left: '50%',
                          transform: 'translateX(-50%)',
                        },
                      }}
                      paddingX={1}
                      position='fixed'
                  >
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