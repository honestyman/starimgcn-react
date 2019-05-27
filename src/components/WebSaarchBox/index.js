import React, { Component } from "react";
import { SearchField, Box, Link, Avatar, Text } from "gestalt";

import "./index.scss";

function ResultList(props) {
    const listItems = props.lists.map(item => (
        <ResultItem {...item} key={item.domain} />
    ));
    return (
        <Box paddingX={2} paddingY={1}>
            {props.lists.length > 0 ? (
                <ul className="star_list">{listItems}</ul>
            ) : props.value ? (
                <Box paddingY={2}>
                    <Text color={"gray"}>
                        你要 pick 的 star ,还没有收录哦！可发邮件到
                        me@johnnyzhang.cn 联系我。
                    </Text>
                </Box>
            ) : null}
        </Box>
    );
}
function ResultItem(props) {
    return (
        <li key={props.domain}>
            <Box
                display="flex"
                direction="row"
                paddingY={2}
                paddingX={2}
                marginTop={1}
                color={"white"}
                alignItems="center"
            >
                <Box width={30}>
                    <Link href={props.domain} target={"self"}>
                        <Avatar
                            name={props.name}
                            src={props.avatar}
                            verified={props.verified || false}
                        />
                    </Link>
                </Box>
                <Box flex="grow" paddingX={2}>
                    <Text
                        color={"gray"}
                        align={"left"}
                        truncate
                        size="xs"
                        lineHeight={30}
                    >
                        <Link href={props.domain} target={"self"}>
                            {props.name} {"(" + props.profession + ")"}
                        </Link>
                    </Text>
                </Box>
            </Box>
        </li>
    );
}
class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.input = null;
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        // console.log(this.state.value))
    }
    handleChange(key) {
        if (!this.props.isFetching && key.length >= 2) {
            this.props.handleSearchChange(key);
        }
    }
    render() {
        return (
            <div className="searchBox">
                <SearchField
                    accessibilityLabel="Demo Search Field"
                    id="searchField"
                    onChange={({ value }) => {
                        this.setState({ value });
                        this.handleChange(value);
                    }}
                    placeholder="输入你想 pick 的 star 的名字"
                    value={this.state.value}
                    onBlur={({ event }) => {
                        console.log("----" + event.target.value);
                    }}
                />
                <ResultList lists={this.props.data} value={this.state.value} />
            </div>
        );
    }
}

export default SearchBox;
