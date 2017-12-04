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
      authModalKey: 0,
      snackbarOpen: false,
      snackbarText: '',
      authToken: '',
      username: '',
      signupValidation: {},
      loginValidation: {}
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

    fetch(`${BASE_URL}/api/auth/login/`, {
      method: 'POST',
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({username, password})
    }).then(res => res.json())
    .then(data => {
      if (data.non_field_errors){
        /* typically invalid credentials error */
        this.setState({
          snackbarText: data.non_field_errors,
          snackbarOpen: true,
          loginValidation: {}
        })
      } else if (data.username || data.password){
        /* field validation error */
        this.setState({
          loginValidation: data
        })
      } else if (data.key){
        /* Login successful */
        this.setState({
          authToken: data.key,
          username: username,
          openAuthModal: false,
          snackbarText: `Welcome back, ${username}!`,
          snackbarOpen: true,
          authModalKey: this.state.authModalKey + 1 // reinitializes authmodal
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

  signup = (username, email, password1, password2) => {
    /**
     * Attempts to create a new user
     * Passes username, email and password to auth endpoint and get user token if successful
     */
    console.log('signing up: ' + username)

    fetch(`${BASE_URL}/api/auth/registration/`, {
      method: 'POST',
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({username, password1, password2, email})
    }).then(res => res.json())
    .then((data) => {
      if (data.key){
        /* Signup successful */
        this.setState({
          authToken: data.key,
          username: username,
          openAuthModal: false,
          snackbarText: `Welcome, ${username}!`,
          snackbarOpen: true,
          authModalKey: this.state.authModalKey + 1 // reinitializes authmodal
        })
      } else if (data.non_field_errors){
        /* errors such as non matching passwords */
        this.setState({
          snackbarText: data.non_field_errors,
          snackbarOpen: true
        })
      } else if (data.password1 || data.password2 || data.username || data.email){
        /* field validation errors */
        this.setState({signupValidation: data})
      }
    })
  }

  logout = () => {
    /**
     * Logs out user
     */

    fetch(`${BASE_URL}/api/auth/logout/`, {method: 'POST'})
    .then(res => res.json())
    .then(data => {
      this.setState({
        authToken: '',
        username: '',
        openDrawer: false,
        snackbarOpen: true,
        snackbarText: data.detail
      })
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
            key={this.state.authModalKey}
            openAuthModal={this.state.openAuthModal}
            handleClose={() => {this.setState({openAuthModal: false})}}
            loginUser={this.login}
            signupUser={this.signup}
            signupValidation={this.state.signupValidation}
            loginValidation={this.state.loginValidation}
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
