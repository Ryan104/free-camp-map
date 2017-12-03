import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { FlatButton, Dialog, Tabs, Tab, TextField } from 'material-ui';

class AuthModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slideIndex: 0
        }
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    styles = {
        dialog: {
            maxWidth: 400,
            minHeight: 600
        },
        dialogBody: {
            padding: 0
        },
        authForm: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 40px'
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.props.handleClose}
            />,
        ]

        return (
            <Dialog
                actions={actions}
                modal={true}
                open={this.props.openAuthModal}
                contentStyle={this.styles.dialog}
                bodyStyle={this.styles.dialogBody}
            >
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Login" value={0} />
                    <Tab label="Signup" value={1} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <form style={this.styles.authForm}>
                        <TextField
                            floatingLabelText="Username"
                        />
                        <TextField
                            floatingLabelText="Password"
                            type="password"
                        />
                    </form>

                    <form style={this.styles.authForm}>
                        <TextField
                            floatingLabelText="Username"
                        />
                        <TextField
                            floatingLabelText="Email Address"
                        />
                        <TextField
                            floatingLabelText="Password"
                            type="password"
                        />
                    </form>
                </SwipeableViews>
            </Dialog>
        )
    }
}

export default AuthModal;