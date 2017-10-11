import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import BookShelfList from './BookShelfList';

configure({ adapter: new Adapter() });

describe('BookList instance is rendered corretly', () => {
    it('renders without crashing', () => {
        const component = <BookShelfList books={[{ id: 0 }, { id: 1 }]} shelves={[{id: 0}, {id: 1}]} onBookShelfChange={() => { }} />;
        expect(shallow(component)).toMatchSnapshot();
    });
});