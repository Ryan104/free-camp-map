import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GoogleMap from 'google-map-react';
import MapContainer from '../components/MapContainer';
import Marker from '../components/Marker';

Enzyme.configure({ adapter: new Adapter() });

test('MapContainer contains a GoogleMap', () => {
    const appComponent = shallow(<MapContainer />);
    expect(appComponent.find(GoogleMap).length).toEqual(1);
  });

test('MapContainer renders', () => {
    const markerListComponent = shallow(<MapContainer />);
    expect(markerListComponent.exists()).toEqual(true);
});

test('MapContainer has no markers when markers array is empty', () => {
    const markers = []
    const zeroMarkerListComponent = shallow(<MapContainer markers={markers} />);
    expect(zeroMarkerListComponent.find(Marker).length).toEqual(0);
})

test('MapContainer has 1 marker when markers array has length 1', () => {
    const markers = [
        {
          lat: 37.9375,
          lng: -107.8123,
          text: "Hello Map!"
        }
    ]
    const oneMarkerListComponent = shallow(<MapContainer markers={markers} />);
    expect(oneMarkerListComponent.find(Marker).length).toEqual(1);
})

test('MapContainer has more than one marker when multiple markers are given', () => {
    const markers = []
    markers.push({lat: 37.9375, lng: -107.8123, text: "Hello Map!"})
    markers.push({lat: 37.9333435, lng: -107.7943726, text: "Hello Map!"})

    const manyMarkerListComponent = shallow(<MapContainer markers={markers} />);
    expect(manyMarkerListComponent.find(Marker).length).toBeGreaterThan(1);
})