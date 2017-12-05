import React from 'react';
import MapsPinDrop from 'material-ui/svg-icons/maps/pin-drop'

const DragMarker = (props) => {
  return (
    <div>
      <MapsPinDrop style={styles.marker} />
    </div>
  )
}

const styles = {
  marker: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: -40,
    left : -25,
    color: 'green'
  }
}

export default DragMarker;