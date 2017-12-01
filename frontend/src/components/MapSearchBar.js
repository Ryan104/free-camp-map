import React, { Component } from 'react'
import { Paper, TextField, IconButton } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search';

class MapSearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchValue: ''
        }

        /* bind methods */
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleSubmit(event){
        /**
         * call searchSubmit from props
         * clear the text value
         */

        if (event) event.preventDefault()

        this.props.searchSubmit(this.state.searchValue)
        this.setState({searchValue: ''})
    }

    handleChange(event){
        /** keep input value in sync with state */
        this.setState({
            searchValue: event.target.value
        })
    }

    render(){
        return (
            <Paper zDepth={3} style={styles.searchBar}>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        hintText="Search"
                        value={this.state.searchValue}
                        onChange={this.handleChange}
                    />
                    <IconButton onClick={this.handleSubmit}>
                        <ActionSearch />
                    </IconButton>
                </form>
            </Paper>
        )
    }
}

const styles={
    searchBar: {
        zIndex: 5,
        margin: '5px auto',
        padding: 5
    }
}

export default MapSearchBar