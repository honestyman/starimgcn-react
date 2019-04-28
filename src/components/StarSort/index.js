import React, { Component } from "react";
import { Box, Text, Flyout, Button, Divider, Column } from "gestalt";

export default class StarSort extends Component {
    constructor(props, context) {
        super(props, context);
        this.time_sort = props.time_sort;
        this.like_sort = props.like_sort;
        this.showLayout = props.showLayout;
        this.sortAnchor = React.createRef();
        this.sortByLike = this.sortByLike.bind(this);
        this.sortByTime = this.sortByTime.bind(this);
        this.handleClick = this._handleClick.bind(this);
        this.handleDismiss = this._handleDismiss.bind(this);
    }
    sortByTime() {
        this.props.hanleSortBy("time");
    }
    sortByLike() {
        this.props.hanleSortBy("like");
    }
    _handleClick() {
        this.props.toggleLayout(true);
    }
    _handleDismiss() {
        this.props.toggleLayout(false);
    }
    render() {
        return (
            <Column span={this.props.clientWidth > 768 ? 9 : 12}>
                <Box color="white" wrap paddingY={2} paddingX={8}>
                    <Box display="inlineBlock" height="36px">
                        <div className="sortLeft">
                            <Text align="left" color="gray">
                                {this.props.type_name} {this.props.total>0 ? this.props.total: '0'}
                                &nbsp;posts
                            </Text>
                        </div>
                    </Box>
                    {/* sort by likeCount */}
                    <div
                        className="sortRight"
                        style={{ display: "inline-block", float: "right" }}
                        ref={this.sortAnchor}
                    >
                        <Button
                            accessibilityExpanded={!!this.props.showLayout}
                            accessibilityHaspopup
                            onClick={this.handleClick}
                            text={
                                this.props.sort_by === "time"
                                    ? `按时间排序 ${this.props.time_sort ==='desc' ? '↓' : '↑'}`
                                    : `按热度排序 ${this.props.like_sort ==='desc' ? '↓' : '↑'}`
                            }
                            size={"sm"}
                            color={"white"}
                        />
                    </div>
                    {/* sort by time */}
                    {this.props.showLayout && (
                        <div className={"sortLayer"}>
                            <Flyout
                                anchor={this.sortAnchor.current}
                                idealDirection="down"
                                onDismiss={this.handleDismiss}
                                size={"xs"}
                            >
                                <Box width={"100%"} paddingY={1}>
                                    <Box>
                                        <Button
                                            accessibilityExpanded={
                                                !!this.props.showLayout
                                            }
                                            accessibilityHaspopup
                                            onClick={this.sortByTime}
                                            text={`按时间排序${this.props.time_sort ==='desc' ? '↓' : '↑'}`}
                                            size={"sm"}
                                            color={"white"}
                                        />
                                    </Box>
                                    <Box>
                                        <Button
                                            accessibilityExpanded={
                                                !!this.props.showLayout
                                            }
                                            accessibilityHaspopup
                                            onClick={this.sortByLike}
                                            text={`按热度排序 ${this.props.like_sort ==='desc' ? '↓' : '↑'}`}
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
            </Column>
        );
    }
}
