import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import SearchPage from './SearchPage';
import { MemoryRouter } from 'react-router-dom'

const book = {
    title: "Title",
    authors: "Authors",
    imageLinks: { thumbnail: "imageUrl" },
    shelf: "none"
}

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

configure({ adapter: new Adapter() });



const historyMock = {
    push: jest.fn()
};

const locationMock = {
    pathname: "search"
}

describe('book instance is rendered corretly', () => {
    it('renders without crashing', () => {
        const component = <SearchPage books={[book]} query={''} history={historyMock} shelves={shelves} location={{}} onBookShelfChange={() => { }} />;
        const test = shallow(component);
        test.setState({searchResults: [book]});
        expect(test).toMatchSnapshot();
    });

    it('renders without crashing without search results', () => {
        const component = <SearchPage books={[book]} query={''} history={historyMock} shelves={shelves} location={{}} onBookShelfChange={() => { }} />;
        expect(shallow(component)).toMatchSnapshot();
    });

    it('renders without crashing when loading', () => {
        const component = <SearchPage books={[book]} query={''} history={historyMock} shelves={shelves} location={{}} onBookShelfChange={() => { }} />;
        const test = shallow(component);
        test.setState({isLoading : true});
        expect(test.state("isLoading")).toBeTruthy();
        expect(test).toMatchSnapshot();
    });
});


describe('user typing at search box', () => {
    it('url is changed with content typed', () => {
        //const onBookShelfChange = jest.fn();
        const component = <MemoryRouter><SearchPage books={[book]} query={''} history={historyMock} shelves={shelves} location={locationMock} onBookShelfChange={() => { }} /></MemoryRouter>;
        const test = mount(component);
        test.find("input").simulate('change', { target: { value: 'mySearchText' } });
        expect(historyMock.push).toHaveBeenCalledTimes(1);
        expect(historyMock.push).toBeCalledWith({ pathname: 'search', search: 'query=mySearchText' });
    });
});

describe('search functionalities', () => {
    it('url change trigger a search', () => {
        const component = <SearchPage books={[book]} query={'myQuery'} history={historyMock} shelves={shelves} location={locationMock} onBookShelfChange={() => { }} />;
        fetch.mockResponse(JSON.stringify({books: [] }))
        const test = shallow(component);
        const spy = jest.spyOn(test.instance(), 'searchBooks');

        test.setProps({query:'myNewQuery'});
        
        expect(spy).toHaveBeenCalled();
        expect(spy).toBeCalledWith('myNewQuery');
        expect(test.state('isLoading')).toBeTruthy();
    });

    it('blank query change clears the search', () => {
        const component = <SearchPage books={[book]} query={'myQuery'} history={historyMock} shelves={shelves} location={locationMock} onBookShelfChange={() => { }} />;
        fetch.mockResponse(JSON.stringify({books: [] }))
        const test = shallow(component);
        test.setProps({query:'myQuery'});
        test.setState({searchResults : []});
        test.setProps({query:''});
        expect(test.state('searchResults')).toBeNull();
    });
});