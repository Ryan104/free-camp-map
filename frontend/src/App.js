import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton, Snackbar } from 'material-ui';

/* import material icons */
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';

import MapContainer from './components/MapContainer';
import MapSearchBar from './components/MapSearchBar';
import AuthModal from './components/AuthModal';
import NewSiteModal from './components/NewSiteModal';
import SaveSiteCard from './components/SaveSiteCard';
import SideMenu from './components/SideMenu';


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
      openCreateModal: false,
      snackbarOpen: false,
      snackbarText: '',
      authToken: '',
      username: '',
      signupValidation: {},
      loginValidation: {},
      newMarkerLocation: null
    }

    /* initialize map center */
    this.state.center = this.state.mapDefaultCenter

    /* bind methods */
    this.searchSubmit = this.searchSubmit.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
    this.createNewMarker = this.createNewMarker.bind(this);
    this.moveNewMarker = this.moveNewMarker.bind(this);
    this.saveNewMarker = this.saveNewMarker.bind(this);
    this.mapMove = this.mapMove.bind(this);
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

  createNewMarker(){
    this.setState({
      newMarkerLocation: this.state.center,
      openDrawer: false
    })
  }

  moveNewMarker(position){
    this.setState({
      newMarkerLocation: position
    })
  }

  mapMove(newCenter){
    this.setState({center: newCenter})
  }

  saveNewMarker(name){
    console.log('saving: ' + name)
    /* post the site NAME, LAT, LNG */
    fetch(`${BASE_URL}/api/campsites/`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Token ${this.state.authToken}`
      }),
      body: JSON.stringify({
        name,
        lat: this.state.newMarkerLocation.lat,
        lng: this.state.newMarkerLocation.lng
      })
    }).then(res => {
      return res.json()
    }).then(data => {
      if (data.id){
        /* success */
        this.setState({newMarkerLocation: null});
        this.updateMarkers();
      } else {
        console.log('error saving new site');
        console.log(data)
      }
    })
  }

  render() {
    let saveOrSearch;
    if (this.state.newMarkerLocation){
      saveOrSearch = <SaveSiteCard handleSubmit={this.saveNewMarker} handleCancel={() => this.setState({newMarkerLocation: {}})} />
    } else {
      saveOrSearch = <MapSearchBar searchSubmit={this.searchSubmit} />
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

          <SideMenu
            open={this.state.openDrawer}
            isSignedIn={!!this.state.authToken}
            onRequestChange={(openDrawer) => this.setState({openDrawer})}
            title={APP_TITLE}
            onLeftIconButtonTouchTap={() => {this.setState({openDrawer: !this.state.openDrawer})}}
            logoutClick={this.logout}
            loginClick={() => {this.setState({openAuthModal: true, openDrawer: false})}}
            newLocationClick={this.createNewMarker}
          />

          <AuthModal
            key={this.state.authModalKey}
            openAuthModal={this.state.openAuthModal}
            handleClose={() => {this.setState({openAuthModal: false})}}
            loginUser={this.login}
            signupUser={this.signup}
            signupValidation={this.state.signupValidation}
            loginValidation={this.state.loginValidation}
          />

          <NewSiteModal
            openCreateModal={this.state.openCreateModal}
            handleClose={() => {this.setState({openCreateModal: false})}}
          />

          {saveOrSearch}
          
          <MapContainer
            markers={this.state.markers}
            mapDefaultCenter={this.state.mapDefaultCenter}
            center={this.state.center}
            onClick={this.mapClick}
            newMarkerLocation={this.state.newMarkerLocation}
            moveNewMarker={this.moveNewMarker}
            mapMove={this.mapMove}
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
