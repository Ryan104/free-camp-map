import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Marker from './components/Marker'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.pageContainer}>
          <AppBar 
            style={styles.navbar}
            title="Camp Free"
            iconElementRight={<FlatButton label="Login" />} 
          />
          <div style={styles.mapContainer}>
            <GoogleMap style={styles.mapComponent}
              bootstrapURLKeys={{
                key: process.env.REACT_APP_MAP_KEY,
                language: 'en'
              }}
              defaultCenter={{lat: 37.9375, lng: -107.8123}}
              defaultZoom={11}
            >
              <Marker lat={37.9375} lng={-107.8123} text={"Hello Map!"}  />
            </GoogleMap>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  pageContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  navbar: {
    flex: '0 1 65px'
  },
  mapContainer: {
    flex: '1 1 auto'
  },
  mapComponent: {
      height: '100%',
      minWidth: '100%',
      
  }
}

export default App;
