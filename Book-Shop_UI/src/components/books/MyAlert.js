import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class MyAlert extends Component {
    render() {
        let vertical = "top"
        let horizontal = "right"
        return (
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={this.props.show} autoHideDuration={6000}>
                <Alert variant="filled" severity={this.props.type === "success" ? "success" : "error"}>                
                    <strong>Success - { this.props.message }</strong>
                </Alert>
            </Snackbar>
        )
    }
}

export default MyAlert