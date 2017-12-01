import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import MapContainer from './components/MapContainer';

const APP_TITLE = "Camp Free"

class App extends Component {
  constructor(props){
    super(props)
    // TODO: Get markers from backend
    // TODO: Get default center from browser location/local storage
    this.state = {
      mapDefaultCenter: {lat: 37.9375, lng: -107.8123},
      markers: [
        {lat: 37.9375, lng: -107.8123, text: "Hello Map!"},
        {lat: 37.9333435, lng: -107.7943726, text: "Hello Map!"}
      ],
      appBarBtnTxt: "Login"
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar 
            title={APP_TITLE}
            iconElementRight={<FlatButton label={this.state.appBarBtnTxt} />} 
          />
          <MapContainer 
            markers={this.state.markers}
            mapDefaultCenter={this.state.mapDefaultCenter} 
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
