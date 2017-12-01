import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import MapContainer from './components/MapContainer';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      markers: [
        {
          lat: 37.9375,
          lng: -107.8123,
          text: "Hello Map!"
        },
        {
          lat: 37.9333435,
          lng: -107.7943726,
          text: "Hello Map!"
        }
      ]
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.pageContainer}>

          <AppBar 
            style={styles.navbar}
            title={APP_TITLE}
            iconElementRight={<FlatButton label="Login" />} 
          />

          <MapContainer markers={this.state.markers} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const APP_TITLE = "Camp Free"

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
  }
}

export default App;
