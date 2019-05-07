import React, { Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AsyncComponent from '../../components/AsyncComponent';

import Header from '../../layouts/Header'
import StarToast from '../../components/Toast'
import Collect from '../Collect'

const AsyncPins= AsyncComponent(() => import('../Pins'))
const AsyncStarList = AsyncComponent(() => import('../StarList'))
const AsyncStar = AsyncComponent(() => import('../Star'))

export default class WebApp extends Component { 
    
    render() { 
        return (
            <Router>
                <div className="webapp">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={AsyncPins} />
                        <Route exact path="/explore" component={AsyncStarList} />
                        <Route exact path="/collect" component={Collect} />
                        <Route exact path="/user" component={Collect} />
                        <Route path="/:domain" component={AsyncStar} />
                    </Switch>
                    {/* toast */}
                    <StarToast /> 
                </div>
        </Router>
        )
    }
    
}