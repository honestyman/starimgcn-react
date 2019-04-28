import React, { Component } from "react";
import {
    Box,
    Column,
    SegmentedControl,
} from "gestalt";

export default class StarTabs extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    handleItemChange({ activeIndex}) {
        this.props.handleItemChange(activeIndex)
    }

    render() {
        const items = ["微博", "Ins", "其他"];
        return (
            <Box
                display="flex"
                direction="row"
                paddingX={this.props.clientWidth > 768 ? 8 : 0}
                justifyContent='center'
            >
                <Column span={this.props.clientWidth > 768 ? 9 : 12}>
                    {/* tabs */}
                    <Box color="white" paddingY={2} wrap paddingX={5}>
                        <SegmentedControl
                            items={items}
                            selectedItemIndex={this.props.itemIndex}
                            onChange={this.handleItemChange}
                        />
                    </Box>
               </Column>
            </Box>
        );
    }
}
