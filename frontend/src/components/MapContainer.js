import React from 'react'
import GoogleMap from 'google-map-react';
import Marker from './Marker'

const MapContainer = ({ markers = [], mapDefaultCenter }) => {
    /*
    Displays a google map with the markers provided by the props
    The Google Maps API key is stored in the .env file
    */
    return (
    <GoogleMap style={styles.mapComponent}
        bootstrapURLKeys={{
        key: process.env.REACT_APP_MAP_KEY,
        language: 'en'
        }}
        defaultCenter={mapDefaultCenter}
        defaultZoom={11}
    >
        {markers.map((marker, i) => (
            <Marker key={i} lat={marker.lat} lng={marker.lng} text={marker.text} />
        ))}
    </GoogleMap>
    )
}

const styles = {
    mapComponent: {
        height: '100%',
        minWidth: '100%',
    }
}

export default MapContainer;