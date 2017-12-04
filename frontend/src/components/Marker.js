import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import shouldPureComponentUpdate from 'react-pure-render/function';
import { Popover } from 'material-ui'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import { pinkA200, pinkA400 } from 'material-ui/styles/colors'

export default class Marker extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false
        }
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
          open: true,
          anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    static propTypes = {
        name: PropTypes.string
    }

    static defaultProps = {}

    // shouldComponentUpdate = shouldPureComponentUpdate

    render(){
        let styles = {
            marker: {
                color: this.state.open ? pinkA400 : pinkA200,
                width: this.state.open ? 60 : 30,
                height: this.state.open ? 60 : 30,
                position: 'absolute',
                left: this.state.open ? -30 : -15,
                top: this.state.open ? -30 : -15
            },
            popover: {
                padding: 10
            }
        }

        return (
            <div data-id={this.props.dataId}>
                <MapsPlace style={styles.marker} onClick={this.handleTouchTap} />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{"horizontal":"left","vertical":"center"}}
                    targetOrigin={{"horizontal":"right","vertical":"center"}}
                    onRequestClose={this.handleRequestClose}
                    style={styles.popover}
                >
                    {this.props.text}
                </Popover>
            </div>
        )
    }
}