import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import MyReadsPage from './MyReadsPage';

const shelves = [
    {
        id: "currentlyReading",
        title: "Currently Reading"
    },
    {
        id: "wantToRead",
        title: "Want to Read"
    },
    {
        id: "read",
        title: "Read"
    }
]

configure({ adapter: new Adapter() })

describe('book instance is rendered corretly', () => {
    it('renders without crashing', () => {
        const component = <MyReadsPage books={[{}]} shelves={shelves} isLoading={false} onBookShelfChange={() => { }} />;
        expect(shallow(component)).toMatchSnapshot();
    });

    it('renders without crashing when loading', () => {
        const component = <MyReadsPage books={[{}]} shelves={shelves} isLoading={true} onBookShelfChange={() => { }} />;
        expect(shallow(component)).toMatchSnapshot();
    });
});