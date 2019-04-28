import React, { Component } from "react";
import { Box, Text, Flyout, Button, Divider } from "gestalt";

export default class StarSort extends Component {
    constructor(props, context) {
        super(props, context);
        this.likeSort = React.createRef();
        this.timeSort = React.createRef();
        this.sortByLike = this.sortByLike.bind(this);
        this.sortByTime = this.sortByTime.bind(this);
        this.handleClick = this._handleClick.bind(this);
        this.handleDismiss = this._handleDismiss.bind(this);
    }
    sortByTime() {
        this.props.hanleSortBy("time", "");
    }
    sortByLike() {
        this.props.hanleSortBy("like", "");
    }
    _handleClick() {
        this.setState(() => ({
            open: !this.state.open
        }));
    }
    _handleDismiss() {
        this.setState(() => ({ open: false }));
    }
    render() {
        return (
            <Box color="white" wrap paddingY={2} paddingX={8}>
                <Box display="inlineBlock" height="36px">
                    <div className="sortLeft">
                        <Text align="left" color="gray">
                            {this.state.type_name} {this.state.total}
                            posts
                        </Text>
                    </div>
                </Box>
                {/* sort by likeCount */}
                <div
                    className="sortRight"
                    style={{ display: "inline-block", float: "right" }}
                    ref={c => {
                        this.anchor = c;
                    }}
                >
                    <Button
                        accessibilityExpanded={!!this.state.open}
                        accessibilityHaspopup
                        onClick={this.handleClick}
                        text={
                            this.state.sort_by === "like"
                                ? "按热度排序"
                                : "按时间排序"
                        }
                        size={"sm"}
                        color={"white"}
                    />
                </div>
                {/* sort by time */}
                {this.state.open && (
                    <div className={"sortLayer"}>
                        <Flyout
                            anchor={this.anchor}
                            idealDirection="down"
                            onDismiss={this.handleDismiss}
                            size={"xs"}
                        >
                            <Box width={"100%"} paddingY={1}>
                                <Box>
                                    <Button
                                        accessibilityExpanded={
                                            !!this.state.open
                                        }
                                        accessibilityHaspopup
                                        onClick={this.handleSortByTime}
                                        text={"按时间排序"}
                                        size={"sm"}
                                        color={"white"}
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        accessibilityExpanded={
                                            !!this.state.open
                                        }
                                        accessibilityHaspopup
                                        onClick={this.handleSortByLikeCount}
                                        text={"按热度排序"}
                                        size={"sm"}
                                        color={"white"}
                                    />
                                </Box>
                            </Box>
                        </Flyout>
                    </div>
                )}
                <Box paddingY={1}>
                    <Divider />
                </Box>
            </Box>
        );
    }
}
