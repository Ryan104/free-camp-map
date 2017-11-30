import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import shouldPureComponentUpdate from 'react-pure-render/function';

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
        }
    }

    render(){
        return (
            <div style={this.styles.markerContainer}>
                <p>{this.props.text}</p>
            </div>
        )
    }
}