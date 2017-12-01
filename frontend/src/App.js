import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import MapContainer from './components/MapContainer';
import MapSearchBar from './components/MapSearchBar';

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

    /* initialize center */
    this.state.center = this.state.mapDefaultCenter

    /* bind methods */
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  // mapClick({x, y, lat, lng, event}){
  //   console.log(x, y, lat, lng, event)
  // }

  searchSubmit(searchValue){
    /**
     * use the search value to get a set of coordinates
     *   using google geocoding api
     * reposition the map at the coordinates 
     */
    
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=${process.env.REACT_APP_GEOCODE_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (data.results[0].geometry.location){
        this.setState({
          center: data.results[0].geometry.location
        })
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <AppBar 
            title={APP_TITLE}
            iconElementRight={<FlatButton label={this.state.appBarBtnTxt} />} 
          />
          <MapSearchBar
            searchSubmit={this.searchSubmit}
          />
          <MapContainer 
            markers={this.state.markers}
            mapDefaultCenter={this.state.mapDefaultCenter}
            center={this.state.center}
            onClick={this.mapClick}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
