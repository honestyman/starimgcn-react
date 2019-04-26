import React, { Component} from 'react'

import Header from '../../layouts/Header/'

export default class WebApp extends Component { 
    constructor(props, context) {
        super(props, context)
        this.state = {

        }
    }

    render() { 
        return (
            <div className="webapp">
                <Header />
            </div>
        )
    }
    
}