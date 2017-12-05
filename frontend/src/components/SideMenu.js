import React from 'react'
import { Drawer, MenuItem, AppBar } from 'material-ui'

/* import material icons */
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location';
import MapsMap from 'material-ui/svg-icons/maps/map';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

const SideMenu = (props) => {
  let menuItems;
  if (props.isSignedIn){
    menuItems = (
      <div>
      <MenuItem primaryText="Logout" leftIcon={<ActionAccountCircle />} onClick={props.logoutClick} />
      <MenuItem disabled={true} />
      <MenuItem primaryText="Map" leftIcon={<MapsMap />} />
      <MenuItem primaryText="Add Site" leftIcon={<MapsAddLocation />} onClick={props.newLocationClick} />
      <MenuItem primaryText="Favorites" leftIcon={<ToggleStar />} />
      </div>
    )
  } else {
    menuItems = (<MenuItem primaryText="Login" leftIcon={<ActionAccountCircle />} onClick={props.loginClick} />)
  }

  return (
    <Drawer
      docked={false}
      open={props.open}
      onRequestChange={props.onRequestChange}
    >
      <AppBar 
        title={props.title}
        onLeftIconButtonTouchTap={props.onLeftIconButtonTouchTap}
      />
      {menuItems}
    </Drawer>
  )
}

export default SideMenu
