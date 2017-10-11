import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import BookShelf from './BookShelf';

configure({ adapter: new Adapter() });

describe('BookList instance is rendered corretly', () => {
    it('renders without crashing', () => {
        const component = <BookShelf shelf={{ title: "Shelft Title" }} books={[{ id: 0 }, { id: 1 }]} shelves={[]} onBookShelfChange={() => { }} />;
        expect(shallow(component)).toMatchSnapshot();
    });
});