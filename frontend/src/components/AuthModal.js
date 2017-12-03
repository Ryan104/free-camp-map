import React, { Component } from 'react';
import { FlatButton, Dialog } from 'material-ui';

class AuthModal extends Component {
    // constructor(props){
    //     super(props)

    // }

    render(){
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
            title="Login or Signup"
            actions={actions}
            modal={true}
            open={this.props.openAuthModal}
        >
            Only actions can close this dialog.
        </Dialog>
        )
    }
}

export default AuthModal;