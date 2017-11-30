import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
//import MapContainer from './components/MapContainer'
import Marker from './components/Marker'

require('dotenv').config()

class App extends Component {
  render() {
    return (
      <div>
        <header>MAP</header>
        <div >
          <GoogleMap style={styles.mapContainer}
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
    );
  }
}

const styles = {
  mapContainer: {
      minHeight: '300px',
      minWidth: '300px'
  }
}

export default App;
