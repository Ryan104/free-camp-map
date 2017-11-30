import React from 'react';

const MapContainer = (props) => {
    return (
        <div style={styles.MapContainer}>
            {props.children}
        </div>
    )
}

const styles = {
    mapContainer: {
        minHeight: '300px',
        minWidth: '300px'
    }
}

export default MapContainer;