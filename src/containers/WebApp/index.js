import React, { Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AsyncComponent from '../../components/AsyncComponent';
import store from '../../store';

import Header from '../../layouts/Header/'
import StarToast from '../../components/Toast'

const AsyncPinsContainer = AsyncComponent(() => import('../../components/PinsContainer'))
const AsyncStarListContainer = AsyncComponent(()=>import('../../components/StarListContainer'))
export default class WebApp extends Component { 
    constructor(props, context) {
        super(props, context)
        this.state = {
            show_toast: false,
            toast_text: ''
        }
    }
    
    componentDidMount() {
        let that = this;
        this.unsubscribeHandler = store.subscribe(() => { 
            const _state = store.getState(); 
            that.setState({
                show_toast: _state.common.show
            })
        })
    }

    componentWillUnmount() { 
        if (this.unsubscribeHandler) { 
            this.unsubscribeHandler();
        }
    }
    
    render() { 
        return (
            <Router>
                <div className="webapp">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={AsyncPinsContainer} />
                        <Route exact path="/explore" component={AsyncStarListContainer} />
                    </Switch>
                    {/* toast */}
                    {this.state.show_toast ?
                        <StarToast
                            showTaost={this.state.show_toast}
                            text={this.state.toast_text}
                        /> : null
                    }
                </div>
        </Router>
        )
    }
    
}