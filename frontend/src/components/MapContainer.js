import React, { Component } from 'react'
import GoogleMap from 'google-map-react';
import Marker from './Marker';
import DragMarker from './DragMarker';

const DRAG_MARKER_NAME = 'DragMarker';

class MapContainer extends Component {
    /**
     * Displays a google map with the markers provided by the props
     * The Google Maps API key is stored in the .env file
     */
    
    constructor(props){
        super(props)
        this.state = {
            draggable: true,
        }
    }

    mouseMove = (hoverKey, childProps, mouse) => {
        /* reposition/drag the new marker */
        if (childProps.name === DRAG_MARKER_NAME){
            this.props.moveNewMarker({lat: mouse.lat, lng: mouse.lng})
        }
    }
    
    mouseDown = (hoverKey, childProps) => {
        /** Keep map from being dragged while placing markers */
        if (childProps.name === DRAG_MARKER_NAME){
            this.setState({draggable: false})
        }
    }

    mouseUp = () => {
        /** Allow map to be draggable */
        this.setState({draggable: true})
    }

    render(){
        let { markers = [], mapDefaultCenter, center, newMarkerLocation } = this.props;

        return (
        <GoogleMap style={styles.mapComponent}
            bootstrapURLKeys={{
            key: process.env.REACT_APP_MAP_KEY,
            language: 'en'
            }}
            defaultCenter={mapDefaultCenter}
            center={center}
            defaultZoom={11}
            onChildMouseDown={this.mouseDown}
            onChildMouseUp={this.mouseUp}
            onChildMouseMove={this.mouseMove}
            draggable={this.state.draggable}
        >
            {markers.map((marker, i) => (
                <Marker key={i} dataId={marker.id} lat={marker.lat} lng={marker.lng} text={marker.name} />
            ))}
            <DragMarker name={DRAG_MARKER_NAME} lat={newMarkerLocation.lat} lng={newMarkerLocation.lng} />
        </GoogleMap>
        )
    }
}

const styles = {
    mapComponent: {
        height: '100%',
        minWidth: '100%',
        position: 'absolute'
    }
}

export default MapContainer;