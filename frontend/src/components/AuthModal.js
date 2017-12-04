import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { FlatButton, Dialog, Tabs, Tab, TextField } from 'material-ui';

class AuthModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slideIndex: 0,
            loginName: '',
            loginPass: '',
            signupName: '',
            signupPass1: '',
            signupPass2: '',
            signupEmail: '',
            submitButtonText: 'LOGIN'
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
    }

    handleSlideChange = (value) => {
        let text = (value === 0) ? 'LOGIN' : 'SIGN UP';
        this.setState({
            slideIndex: value,
            submitButtonText: text
        });
    };

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSumbit(){
        
        if (this.state.slideIndex === 0){
            /* LOGIN */
            this.props.loginUser(this.state.loginName, this.state.loginPass)
        } else if (this.state.slideIndex === 1){
            /* SIGNUP */
            this.props.signupUser(this.state.signupName, this.state.signupEmail, this.state.signupPass1, this.state.signupPass2)
        }
    }

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
                label={this.state.submitButtonText}
                primary={true}
                onClick={this.handleSumbit}
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
                    onChange={this.handleSlideChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Login" value={0} />
                    <Tab label="Signup" value={1} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleSlideChange}
                >
                    <form style={this.styles.authForm}>
                        <TextField
                            name="loginName"
                            value={this.state.loginName}
                            floatingLabelText="Username"
                            onChange={this.handleInputChange}
                            errorText={this.props.loginValidation.username}
                        />
                        <TextField
                            name="loginPass"
                            value={this.state.loginPass}
                            floatingLabelText="Password"
                            type="password"
                            onChange={this.handleInputChange}
                            errorText={this.props.loginValidation.password}
                        />
                    </form>

                    <form style={this.styles.authForm}>
                        <TextField
                            name="signupName"
                            value={this.state.signupName}
                            floatingLabelText="Username"
                            onChange={this.handleInputChange}
                            errorText={this.props.signupValidation.username}
                        />
                        <TextField
                            name="signupEmail"
                            value={this.state.signupEmail}
                            floatingLabelText="Email Address"
                            onChange={this.handleInputChange}
                            errorText={this.props.signupValidation.email}
                        />
                        <TextField
                            name="signupPass1"
                            value={this.state.signupPass1}
                            floatingLabelText="Password"
                            type="password"
                            onChange={this.handleInputChange}
                            errorText={this.props.signupValidation.password1}
                        />
                        <TextField
                            name="signupPass2"
                            value={this.state.signupPass2}
                            floatingLabelText="Confirm Password"
                            type="password"
                            onChange={this.handleInputChange}
                            errorText={this.props.signupValidation.password2}
                    />
                    </form>
                </SwipeableViews>
            </Dialog>
        )
    }
}

export default AuthModal;