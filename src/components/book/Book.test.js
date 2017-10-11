import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Book from './Book';

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

configure({ adapter: new Adapter() })


it('getImageUrl returns the correct value when not null', () => {
    const component = <Book book={{ imageLinks: { thumbnail: "imageUrl" } }} shelves={shelves} onBookShelfChange={() => { }} />;
    const test = mount(component);
    expect(test.instance().getImageUrl()).toBe("imageUrl");
});

it('getImageUrl returns "" when value is null', () => {
    const component = <Book book={{ imageLinks: null }} shelves={shelves} onBookShelfChange={() => { }} />;
    const test = mount(component);
    expect(test.instance().getImageUrl()).toBe("");
});

it('getBookShelf returns the correct value when not null', () => {
    const component = <Book book={{ shelf: "currentlyReading" }} shelves={shelves} onBookShelfChange={() => { }} />;
    const test = mount(component);
    expect(test.instance().getBookShelf()).toBe("currentlyReading");
});

it('getBookShelf returns "none" when value is null', () => {
    const component = <Book book={{ shelf: null }} shelves={shelves} onBookShelfChange={() => { }} />;
    const test = mount(component);
    expect(test.instance().getBookShelf()).toBe("none");
});

describe('book instance is rendered corretly', () => {
    it('renders without crashing', () => {
        const component = <Book book={book} shelves={shelves} onBookShelfChange={() => { }} />;
        expect(shallow(component)).toMatchSnapshot();
    });
});


describe('user click on shelf changed', () => {
    it('event onBookShelfChange is called', () => {
        const onBookShelfChange = jest.fn();
        const component = <Book book={book} shelves={shelves} onBookShelfChange={onBookShelfChange} />;
        const test = mount(component);
        test.find("select").simulate('change', { target: { value: 'currentlyReading' } });
        expect(onBookShelfChange).toHaveBeenCalledTimes(1);
        expect(onBookShelfChange).toBeCalledWith(book, 'currentlyReading');
    });

    it('state.loading is true and loading is rendered', () => {
        const onBookShelfChange = jest.fn();
        const component = <Book book={book} shelves={shelves} onBookShelfChange={onBookShelfChange} />;
        const test = mount(component);
        test.find("select").simulate('change', { target: { value: 'currentlyReading' } });
        expect(onBookShelfChange).toHaveBeenCalledTimes(1);
        expect(test.state("isUpdating")).toBeTruthy();
        expect(test).toMatchSnapshot();
    });

    it('state.loading is false after the component update', () => {
        const onBookShelfChange = jest.fn();
        const component = <Book book={book} shelves={shelves} onBookShelfChange={onBookShelfChange} />;
        let test = mount(component);

        //make the component state laoding
        test.setState({isUpdating:true});
        expect(test.state("isUpdating")).toBeTruthy();

        //send new props and check if the isUpdating changed to false
        test = test.setProps({book, shelves, onBookShelfChange});
        expect(test.state("isUpdating")).toBeFalsy();
        expect(test).toMatchSnapshot();
    });
});