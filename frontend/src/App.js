import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Marker from './components/Marker'

require('dotenv').config()

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar 
            title="Camp Free"
            iconElementRight={<FlatButton label="Login" />} 
          />
          <div style={styles.mapContainer}>
            <GoogleMap style={styles.mapComponent}
              // bootstrapURLKeys={{
              //   key: process.env.REACT_APP_MAP_KEY,
              //   language: 'en'
              // }}
              defaultCenter={{lat: 59.95, lng: 30.33}}
              defaultZoom={11}
            >
              <Marker lat={59.95} lng={30.33} text={"Hello Map!"}  />
            </GoogleMap>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  mapContainer: {

  },
  mapComponent: {
      height: '100%',
      minWidth: '100%',
      position: 'absolute'
  }
}

export default App;
