import React, { Component } from 'react'

export default class Collect extends Component { 
    render() { 
        const style = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%'
        }
        return (
            <div style={style}>
                开发中...
            </div>
        )
    }
}