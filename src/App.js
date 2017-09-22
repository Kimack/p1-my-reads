import React from 'react'
import * as BooksAPI from './api/BooksAPI.js'
import StaticBooksAPI from './api/StaticBooksAPI.js'
import './App.css'

import SearchPage from "./pages/SearchPage.js"
import MyReadsPage from "./pages/MyReadsPage.js"
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {

    state = {
        /**
         * Array of books that are on a available shelf
         */
        books: [],

        /**
         * Available shelves
         */
        shelves: []
    }

    /**
     * Load all available shelves
     * Load all books that belong to a shelve
     */
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books });
        });

        StaticBooksAPI.getShelves().then((shelves) => {
            this.setState({ shelves });
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
            .update(changedBook, shelf).then((aa) => {
                this.setState((previousState, props) => {
                    const books = previousState.books.filter((book) => {
                        return book.id !== changedBook.id;
                    })
                    if (shelf !== "none") {
                        changedBook.shelf = shelf
                        books.push(changedBook);
                    }
                    return { books: books };
                });
            });
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <SearchPage books={this.state.books} shelves={this.state.shelves} onBookShelfChange={this.onBookShelfChange} />
                )} />

                <Route exact path="/" render={() => (
                    <MyReadsPage books={this.state.books} shelves={this.state.shelves} onBookShelfChange={this.onBookShelfChange} />
                )} />
            </div>
        )
    }
}
export default BooksApp