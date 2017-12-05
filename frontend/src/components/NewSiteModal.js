import React, { Component } from 'react'

import SwipeableViews from 'react-swipeable-views';
import { FlatButton, Dialog, Tabs, Tab, TextField } from 'material-ui';

class NewSiteModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }

  handleSlideChange = (value) => {
    this.setState({
      slideIndex: value
    });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  styles = {
    dialog: {
      // maxWidth: 400,
      // minHeight: 600
    },
    dialogBody: {
      padding: 0
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px 40px'
    }
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label='SUBMIT'
        primary={true}
        onClick={this.handleSumbit}
      />,
    ]

    return(
      <Dialog
        actions={actions}
        modal={true}
        open={this.props.openCreateModal}
        contentStyle={this.styles.dialog}
        bodyStyle={this.styles.dialogBody}
      >
        <Tabs
          onChange={this.handleSlideChange}
          value={this.state.slideIndex}
        >
          <Tab label="Details" value={0} />
          <Tab label="Description" value={1} />
          <Tab label="Directions" value={2} />
        </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleSlideChange}
          >
            <form style={this.styles.form}>
              <TextField
                name="name"
                value={this.state.name}
                floatingLabelText="Give the site a name"
                onChange={this.handleInputChange}
              />
              <TextField
                name="lat"
                value={this.props.lat}
              />
              <TextField
                name="lng"
                value={this.props.lng}
              />
            </form>
            <form style={this.styles.form}>
              <TextField
                name="Description"
                
                multiLine={true}
                rows={6}
              />
            </form>
            <form style={this.styles.form}>
            <TextField
              name="Description"
              
              multiLine={true}
              rows={6}
            />
            </form>
          </SwipeableViews>
      </Dialog>
    )
  }
}

export default NewSiteModal;