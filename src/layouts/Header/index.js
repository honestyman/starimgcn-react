import React, { Component } from "react";

import WebHeader from "../../containers/WebHeader";
import MobileHeader from "../../containers/MobileHeader";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.isMobile = window.innerWidth <= 768;
    }

    componentDidMount() {
        window.addEventListener("resize", this.mobileDetect, false);
    }

    mobileDetect = () => {
        this.isMobile = window.innerWidth <= 768;
    };

    render() {
        return this.isMobile ? (
            <MobileHeader />
        ) : (
            <WebHeader />
        );
    }
}