import React from 'react'
import * as BooksAPI from './api/BooksAPI.js'
import StaticBooksAPI from './api/StaticBooksAPI.js'
import './App.css'

import SearchPage from "./pages/SearchPage.js"
import MyReadsPage from "./pages/MyReadsPage.js"
import { Route } from 'react-router-dom'
import NotificationSystem from 'react-notification-system'
import sortBy from 'sort-by'

class BooksApp extends React.Component {

    state = {
        /**
         * Array of books that are on a available shelf
         */
        books: [],

        /**
         * Data is still loading
         */
        isLoading: true,
    };

    /**
     * Array of available shelves
     */
    shelves = null;

    /**
     * 
     */
    notificationSystem = null;

    /**
     * Dispath a notification
     */
    addNotification = (title, message, level, position) => {
        this.notificationSystem.addNotification({
            title, message, level, position
        });
    }

    /**
     * Load all available shelves
     * Load all books that belong to a shelve
     */
    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;

        BooksAPI.getAll().then((books) => {
            books.sort(sortBy("title"));
            this.setState({ books, isLoading: false });
        }).catch(() => {
            this.setState({ isLoading: false });
            this.addNotification("Error", "Could not load shelfs", "error", "tc");
        })

        StaticBooksAPI.getShelves().then((shelves) => {
            this.shelves = shelves;
        });
    }

    /**
     * Update a book to change it shelf.
     * @param changedBook the book that had the shelf changed
     * @param shelf the id of the new shelf
     */
    onBookShelfChange = (changedBook, shelf) => {
        if (changedBook.shelf === shelf) return;
        BooksAPI
            .update(changedBook, shelf).then(() => {
                this.setState((previousState) => ({
                    //filter out the changed book, then create a new book if the book is 
                    //assigned to a new shelf updating the shelf, sort the elements 
                    //and push the book to the state

                    books: previousState.books
                        .filter(book => book.id !== changedBook.id)
                        .concat({ ...changedBook, shelf })
                        .filter(book => book.shelf !== "none")
                        .sort(sortBy("title"))
                }));
            }).catch(() => {
                //how to reset the loading of the specific item? remove it and insert again in the collection?
                this.setState((previousState) => {
                    const books = previousState.books.filter((book) => {
                        return book.id !== changedBook.id;
                    })
                    books.push(changedBook);
                    books.sort(sortBy("title"));
                    return { books: books };
                });

                this.addNotification("Error", "Could not update shelf", "error", "tc");
            });
    }

    render() {
        return (
            <div className="app">
                <NotificationSystem ref="notificationSystem" />
                <Route path="/search" render={(props) => {
                    const params = new URLSearchParams(props.location.search);
                    const query = params.get('query'); // bar
                    return (
                        <SearchPage
                            {...props}
                            books={this.state.books}
                            shelves={this.shelves}
                            query={query}
                            onBookShelfChange={this.onBookShelfChange} />
                    )
                }} />

                <Route exact path="/" render={() => (
                    <MyReadsPage
                        books={this.state.books}
                        shelves={this.shelves}
                        isLoading={this.state.isLoading}
                        onBookShelfChange={this.onBookShelfChange} />
                )} />
            </div>
        )
    }
}
export default BooksApp