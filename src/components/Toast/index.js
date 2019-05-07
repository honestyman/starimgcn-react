import { Toast, Box } from "gestalt";
import React from "react";
import { connect } from "react-redux";

const StarToast = props => {
    return (
        <div className="starToast">
            {props.show ? (
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
                    <Toast
                        color="orange"
                        text={props.text || "咦，好像哪里出错了！"}
                    />
                </Box>
            ) : null}
        </div>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        ...state.common.toast
    };
}

export default connect(mapStateToProps)(StarToast);
