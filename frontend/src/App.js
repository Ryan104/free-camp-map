import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton, Drawer, MenuItem, Snackbar } from 'material-ui';

/* import material icons */
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location';
import MapsMap from 'material-ui/svg-icons/maps/map';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

import MapContainer from './components/MapContainer';
import MapSearchBar from './components/MapSearchBar';
import AuthModal from './components/AuthModal';

const APP_TITLE = "CAMP FREE"

let BASE_URL = 'http://localhost:8000'
if (process.env.NODE_ENV === 'production'){
  BASE_URL = ''
}

class App extends Component {
  constructor(props){
    super(props)
    // TODO: Get default center from browser location/local storage
    this.state = {
      mapDefaultCenter: {lat: 37.9375, lng: -107.8123},
      markers: [],
      appBarBtnTxt: "Login",
      openDrawer: false,
      openAuthModal: false,
      snackbarOpen: false,
      snackbarText: '',
      authToken: '',
      username: ''
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

  /*** AUTH METHODS ***/
  login = (username, password) => {
    /**
     * Attempts to login a returning user
     * Passes username and password to auth endpoint and get user token if successful
     */
    console.log('loggin in: ' + username);

    fetch(`${BASE_URL}/api/auth`, {
      method: 'POST',
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({username, password})
    }).then(res => res.json())
    .then(data => {
      if (data.non_field_errors){
        /* typically invalid credentials error */
        this.setState({
          snackbarText: 'INVALID username or password',
          snackbarOpen: true
        })
      } else if (data.username || data.password){
        /* typically requried field missing */
        this.setState({
          snackbarText: 'Please enter a USERNAME and PASSWORD',
          snackbarOpen: true
        })
      } else if (data.token){
        /* Login successful */
        this.setState({
          authToken: data.token,
          username: username,
          openAuthModal: false,
          snackbarText: `Welcome back, ${username}!`,
          snackbarOpen: true
        })
      } else {
        console.log(data)
        this.setState({
          snackbarText: 'Error Logging in',
          snackbarOpen: true
        })
      }
    }).catch(err => console.log(err));
  }

  signup = (username, email, password) => {
    /**
     * Attempts to create a new user
     * Passes username, email and password to auth endpoint and get user token if successful
     */
    console.log('signing up: ' + username)
  }

  logout = () => {
    this.setState({
      authToken: '',
      username: '',
      openDrawer: false,
      snackbarOpen: true,
      snackbarText: 'Logout Successful!'
    })
  }

  /********** MAP METHODS **********/
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
          // Currently, all markers are loaded at componentDidMount() so there is no need to reload them after search
          //this.updateMarkers();
        }
      })
    }
  }

  updateMarkers(){
    /**
     * Updates state.makers by making an API call with the current
     *   center and radius and expecting a new array of markers
     */

    // call api/campsites?lat&lng&radius
    let { lat, lng } = this.state.center;
    let radius = 100; //miles
    fetch(`${BASE_URL}/api/campsites/?lat=${lat}&lng=${lng}&radius=${radius}`)
    // update state with results
    .then(res => res.json())
    .then(data => {
      this.setState({
        markers: data
      })
    })
  }

  render() {
    let loginMenuItem;
    if (this.state.authToken){
      loginMenuItem = <MenuItem primaryText="Logout" leftIcon={<ActionAccountCircle />} onClick={this.logout} />
    } else {
      loginMenuItem = <MenuItem primaryText="Login" leftIcon={<ActionAccountCircle />} onClick={() => {this.setState({openAuthModal: true, openDrawer: false})}} />
    }
    return (
      <MuiThemeProvider>
        <div style={{display: 'flex', flexDirection: 'column'}}>

          <AppBar 
            title={APP_TITLE}
            iconElementRight={
              <IconButton>
                <MapsMyLocation />
              </IconButton>} 
            onLeftIconButtonTouchTap={() => {this.setState({openDrawer: !this.state.openDrawer})}}
          />

          <Drawer
            docked={false}
            open={this.state.openDrawer}
            onRequestChange={(openDrawer) => this.setState({openDrawer})}
          >
            <AppBar 
              title={APP_TITLE}
              onLeftIconButtonTouchTap={() => {this.setState({openDrawer: !this.state.openDrawer})}}
            />
            {loginMenuItem}
            <MenuItem disabled={true} />
            <MenuItem primaryText="Map" leftIcon={<MapsMap />} />
            <MenuItem primaryText="Add Site" leftIcon={<MapsAddLocation />} />
            <MenuItem primaryText="Favorites" leftIcon={<ToggleStar />} />
          </Drawer>

          <AuthModal
            openAuthModal={this.state.openAuthModal}
            handleClose={() => {this.setState({openAuthModal: false})}}
            loginUser={this.login}
            signupUser={this.signup}
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

          <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarText}
            autoHideDuration={4000}
            onRequestClose={() => {this.setState({snackbarOpen: false})}}
          />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
