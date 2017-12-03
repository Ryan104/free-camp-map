import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import MapContainer from './components/MapContainer';
import MapSearchBar from './components/MapSearchBar';

const APP_TITLE = "CAMP FREE"
let BASE_URL = 'http://localhost:8000'
if (process.env.NODE_ENV === 'production'){
  BASE_URL = ''
}

class App extends Component {
  constructor(props){
    super(props)
    // TODO: Get markers from backend
    // TODO: Get default center from browser location/local storage
    this.state = {
      mapDefaultCenter: {lat: 37.9375, lng: -107.8123},
      markers: [],
      appBarBtnTxt: "Login"
    }

    /* initialize map center */
    this.state.center = this.state.mapDefaultCenter

    /* bind methods */
    this.searchSubmit = this.searchSubmit.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
  }

  componentDidMount(){
    this.updateMarkers();
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
    if (searchValue){
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=${process.env.REACT_APP_GEOCODE_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.results[0]){
          this.setState({
            center: data.results[0].geometry.location
          })
          this.updateMarkers();
        }
      })
    }
  }

  updateMarkers(){
    /**
     * Updates state.makers by making an API call with the current
     *   center and radius and expecting a new array of markers
     */

    console.log('getMarkers()');

    // call api/campsites?lat&lng&radius
    let { lat, lng } = this.state.center;
    let radius = 100; //miles
    fetch(`${BASE_URL}/api/campsites/?lat=${lat}&lng=${lng}&radius=${radius}`)
    // update state with results
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        markers: data
      })
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
