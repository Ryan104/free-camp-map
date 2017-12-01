import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import shouldPureComponentUpdate from 'react-pure-render/function';
import MapsPlace from 'material-ui/svg-icons/maps/place'
import { pinkA200 } from 'material-ui/styles/colors'

export default class Marker extends Component {
    static propTypes = {
        text: PropTypes.string
    }

    static defaultProps = {}

    // shouldComponentUpdate = shouldPureComponentUpdate

    styles = {
        markerContainer: {
            position: 'absolute',
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: 10,
            padding: 4,
            width: '100px'
        },
        marker: {
            color: pinkA200
        }
    }

    render(){
        return (
            <div>
                <MapsPlace style={this.styles.marker} />
            </div>
        )
    }
}