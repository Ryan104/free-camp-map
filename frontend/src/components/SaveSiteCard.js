import React, { Component } from 'react'
import { Paper, RaisedButton, TextField } from 'material-ui'

class SaveSiteCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      siteNameValue: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  render(){
    return (
    <Paper style={{zIndex: 5, maxWidth: 400, margin: '5px auto', padding: 5}}>
      <p>Place the map marker in the desired location</p>
      <TextField
        name="siteNameValue"
        floatingLabelText="Site Name"
        value={this.state.siteNameValue}
        onChange={this.handleInputChange}
      />
      <RaisedButton label="SAVE NEW SITE" />
    </Paper>
    )
  }
}

export default SaveSiteCard