import React, { Component } from 'react';
export default function asyncComponent(importComponent) { 
    class AsyncComponent extends Component { 
        constructor(props) { 
            super(props);
            this.state = {
                component: null // 动态加载的组件
            }
        }

        componentDidMount() { 
            importComponent().then((mod) => { 
                this.setState({
                    // 同时兼容 ES6 和 Common.js 的模块
                    component: mod.default ? mod.default : mod
                })
            })
        }
        
        render() { 
            const C = this.state.component;
            return C ? <C {...this.props}></C> : null;
        }
    }
    return AsyncComponent;
}