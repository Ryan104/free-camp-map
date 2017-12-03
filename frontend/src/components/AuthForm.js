import React, {Component} from 'react';
import { TextField } from 'material-ui'

class AuthForm extends Component{
    render(){
        return(
            <div>
                <h3>Login / Signup</h3>
                <form>
                    <TextField
                        floatingLabelText="Username"
                    />
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                    />
                </form>
            </div>
        )
    }
}

export default AuthForm