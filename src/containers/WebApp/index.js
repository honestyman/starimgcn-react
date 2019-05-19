import React, { Suspense, lazy, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../../layouts/Header";
import StarToast from "../../components/Toast";
import Collect from "../Collect";

// 动态引入组件
// React.lazy 和 Suspense 技术还不支持服务端渲染
const AsyncPins = lazy(() => import("../Pins"));
const AsyncStarList = lazy(() => import("../StarList"));
const AsyncStar = lazy(() => import("../Star"));

export default class WebApp extends Component {
    render() {
        return (
            <Router>
                <div className="webapp">
                    <Header />
                    {/* 使用加载指示器为此组件做优雅降级 */}
                    <Suspense fallback={<div style={{textAlign: "center",padding: "20px 15px"}}>Loading...</div>}>
                        <Switch>
                            <Route exact path="/" component={AsyncPins} />
                            <Route
                                exact
                                path="/explore"
                                component={AsyncStarList}
                            />
                            <Route exact path="/collect" component={Collect} />
                            <Route exact path="/user" component={Collect} />
                            <Route path="/:domain" component={AsyncStar} />
                        </Switch>
                    </Suspense>
                    {/* toast */}
                    <StarToast />
                </div>
            </Router>
        );
    }
}
