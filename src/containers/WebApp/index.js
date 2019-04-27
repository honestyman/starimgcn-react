import React, { Component} from 'react'

import Header from '../../layouts/Header/'
import PinsContail from '../../components/PinsContainer'
import StarToast from '../../components/Toast'
import store from '../../store'
export default class WebApp extends Component { 
    constructor(props, context) {
        super(props, context)
        this.state = {
            show_toast: false
        }
    }

    
    componentDidMount() {
        store.subscribe(() => { 
            console.log('---state--change--');
            console.log(store.getState())
        })
    }
    

    render() { 
        return (
            <div className="webapp">
                <Header />
                <PinsContail />
                {
                    this.state.show_toast ? <StarToast />
                    : null
                }
            </div>
        )
    }
    
}