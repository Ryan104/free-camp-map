import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';
import GoogleMap from 'google-map-react';
import AppBar from 'material-ui/AppBar';

Enzyme.configure({ adapter: new Adapter() });

test('App component renders without crashing', () => {
  const appComponent = shallow(<App />);
  expect(appComponent.exists()).toEqual(true);
});

test('App component contains a GoogleMap', () => {
  const appComponent = shallow(<App />);
  expect(appComponent.find(GoogleMap).length).toEqual(1);
});

test('App component contains an AppBar', () => {
  const appComponent = shallow(<App />);
  expect(appComponent.find(AppBar).length).toEqual(1);
});

test('App component contains a search bar');