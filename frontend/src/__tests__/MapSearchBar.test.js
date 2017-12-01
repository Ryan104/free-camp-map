import React from 'react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MapSearchBar from '../components/MapSearchBar'
import { TextField, IconButton } from 'material-ui'

Enzyme.configure({ adapter: new Adapter() });

test('MapSearchBar renders without crashing', () => {
    const searchBarComponent = shallow(<MapSearchBar />);
    expect(searchBarComponent.exists()).toEqual(true);
});

test('MapSearchBar should contain a TextField', () => {
    const searchBarComponent = shallow(<MapSearchBar />);
    expect(searchBarComponent.find(TextField).length).toEqual(1);
})

// test('MapSearchBar should contain a submit button', () => {
//     const searchBarComponent = shallow(<MapSearchBar />);
//     const handleSubmit = () => {}
//     console.log(searchBarComponent.find(IconButton).get(0).props)
//     expect(searchBarComponent.find(IconButton).get(0).props).toContain({onClick: handleSubmit.bind(this)});
// })