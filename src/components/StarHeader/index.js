import React, { Component } from "react";
import { Avatar, Box, Column, Link, Text, Mask } from "gestalt";

import wb from "../../assets/images/weibo.svg";
import ins from "../../assets/images/instagram.svg";
import fb from "../../assets/images/facebook.svg";

// 百度百科
function StarBaiDuProfile(props) {
    return (
        <Box display="flex" column={12} paddingX={5} paddingY={1}>
            <Box
                color="white"
                paddingY={1}
                display={props.baike && props.baike !== "" ? "block" : "none"}
            >
                <Text align={"left"} inline={true} color={"gray"}>
                    百度人物资料&nbsp;&nbsp;
                </Text>
                <Text align="left" inline={true}>
                    {props.description}
                </Text>
                {props.baike ? (
                    <Text align={"left"} inline={true} color={"orange"}>
                        <Link inline={true} href={props.baike} target={"blank"}>
                            详情
                        </Link>
                    </Text>
                ) : null}
            </Box>
        </Box>
    );
}
// 社交媒体
function StarSocial(props) {
    let { wb_id, wb_domain, ins_name, fb_domain } = props;
    const style = {
        maxWidth: "100%",
        display: "block"
    };
    return (
        <Box color="white" paddingY={1} paddingX={5} alignSelf={"center"}>
            {/* weibo */}
            <Box
                width={24}
                display={wb_domain || wb_id ? "inlineBlock" : "none"}
            >
                <Link
                    href={
                        "https://weibo.com/" +
                        (wb_domain ? props.wb_domain : "u/" + wb_id)
                    }
                    target={"blank"}
                >
                    <Mask shape="circle">
                        <img
                            alt={
                                "https://weibo.com/" +
                                (wb_domain ? wb_domain : "u/" + wb_id)
                            }
                            src={wb}
                            style={style}
                        />
                    </Mask>
                </Link>
            </Box>
            {/* ins */}
            <Box
                width={24}
                display={ins_name ? "inlineBlock" : "none"}
                marginLeft={2}
            >
                <Link
                    href={"https://instagram.com/" + ins_name}
                    target={"blank"}
                >
                    <Mask shape="circle">
                        <img
                            alt={"https://instagram.com/" + ins_name}
                            src={ins}
                            style={style}
                        />
                    </Mask>
                </Link>
            </Box>
            {/* facebook */}
            <Box
                width={24}
                display={fb_domain ? "inlineBlock" : "none"}
                marginLeft={2}
            >
                <Link
                    href={"https://facebook.com/" + fb_domain}
                    target={"blank"}
                >
                    <Mask shape="circle">
                        <img
                            alt={"https://facebook.com/" + fb_domain}
                            src={fb}
                            style={style}
                        />
                    </Mask>
                </Link>
            </Box>
        </Box>
    );
}
// 头像部分
function StarAvatar(props) {
    return (
        <Box
            color="white"
            paddingX={5}
            paddingY={3}
            display={"flex"}
            direction={"column"}
            alignSelf={"end"}
            alignItems={"end"}
        >
            <Box
                color="white"
                paddingY={2}
                width={props.isMobile ? 50 : 106}
                alignContent={"end"}
                alignSelf={"end"}
                alignItems={"end"}
                display={"flex"}
            >
                <Avatar
                    name={"User name"}
                    src={props.avatar}
                    verified={props.verified}
                />
            </Box>
        </Box>
    );
}
// 介绍
function StarProfile(props) {
    return (
        <Box color="white" paddingX={5} paddingY={1}>
            <Box color="white" paddingY={2}>
                <Text align={"left"}>{props.name}</Text>
            </Box>
            <Box color="white">
                <Text align={"left"} size={"xs"} color={"gray"}>
                    {props.verified ? props.verified_reason : ""}
                </Text>
            </Box>
            <Box color="white" paddingY={1}>
                <Text align={"left"} inline={true} bold={true}>
                    {props.posts_count}
                </Text>
                <Text align={"left"} inline={true}>
                    &nbsp;posts
                </Text>
            </Box>
            {/* 介绍以及社交账号 */}
        </Box>
    );
}

export default class StarHeader extends Component {
    constructor(props, context) {
        super(props, context);
        this.isMobile = props.clientWidth < 768;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !this.props.name || nextProps.name !== this.props.name;
    }

    render() {
        return (
            <Box>
                <Box display="flex" direction="row" paddingX={8} paddingY={2}>
                    <Column span={this.isMobile ? 3 : 5}>
                        <StarAvatar
                            isMobile={this.isMobile}
                            avatar={this.props.avatar}
                            verified={this.props.verified}
                        />
                    </Column>
                    <Column span={this.isMobile ? 9 : 5}>
                        <StarProfile
                            name={this.props.name}
                            verified={this.props.verified}
                            verified_reason={this.props.verified_reason}
                            posts_count={this.props.posts_count}
                        />
                        {this.isMobile ? (
                            <StarSocial {...this.props} />
                        ) : null}
                        {!this.isMobile ? (
                            <StarBaiDuProfile
                                baike={this.props.baike}
                                description={this.props.description}
                            />
                        ) : null}
                    </Column>
                </Box>
                {this.isMobile ? (
                    <StarBaiDuProfile
                        baike={this.props.baike}
                        description={this.props.description}
                    />
                ) : null}
            </Box>
        );
    }
}
