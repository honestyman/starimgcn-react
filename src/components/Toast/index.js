import { Toast, Box } from "gestalt";
import React, { Component } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

export default class StarToast extends Component {
    static propTypes = {
        showTaost: PropTypes.bool.isRequired,
        test: PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);
        this.showTaost = props.showTaost || false;
        this.text = props.text || "";
        this.container = document.createElement("div");
        document.body.appendChild(this.container);
    }
    componentWillUnmount() {
        document.body.removeChild(this.container);
    }

    render() {
        return ReactDom.createPortal(
            <div className="modal">
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fit
                    dangerouslySetInlineStyle={{
                        __style: {
                            bottom: 250,
                            left: "50%",
                            transform: "translateX(-50%)"
                        }
                    }}
                    paddingX={1}
                    position="fixed"
                >
                    {this.showTaost ? (
                        <Toast
                            color="orange"
                            text={this.text || "咦，好像哪里出错了！"}
                        />
                    ) : null}
                </Box>
            </div>,
            this.container
        );
    }
}
