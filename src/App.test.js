import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import BooksApp from './App';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const component = <BooksApp />;
  expect(shallow(component)).toMatchSnapshot();
});
