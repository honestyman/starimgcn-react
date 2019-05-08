import React, { Component } from "react";

import WebHeader from "../../components/WebHeader";
import MobileHeader from "../../components/MobileHeader";

export default class Header extends Component {
    constructor(props) {
        super(props);
        // console.log(props);
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
            <MobileHeader handleChange={this.props.handleChange} />
        ) : (
            <WebHeader handleChange={this.props.handleChange} />
        );
    }
}