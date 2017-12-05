import React, { Component } from 'react'
import { Card, CardText, CardActions, RaisedButton, TextField } from 'material-ui'

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
    <Card style={{zIndex: 5, maxWidth: 400, margin: '5px auto', padding: 5}}>
      <CardText>
        <i>Drag the map marker to the desired location</i>
        <TextField
          name="siteNameValue"
          floatingLabelText="Site Name"
          value={this.state.siteNameValue}
          onChange={this.handleInputChange}
        />
      </CardText>
      <CardActions>
        <RaisedButton label="CANCEL" onClick={this.props.handleCancel} />
        <RaisedButton primary={true} label="SAVE NEW SITE" onClick={() => this.props.handleSubmit(this.state.siteNameValue)} />
      </CardActions>
    </Card>
    )
  }
}

export default SaveSiteCard