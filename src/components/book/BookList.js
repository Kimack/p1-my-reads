import React from 'react'
import Book from './Book.js'
import PropTypes from 'prop-types';

const BookList = ({ books, shelves, onBookShelfChange }) => (
    <ol className="books-grid">
        {
            books.map((book) => (
                <li key={book.id}>
                    <Book
                        book={book}
                        shelves={shelves}
                        onBookShelfChange={onBookShelfChange} />
                </li>
            ))
        }
    </ol>
)

BookList.propTypes = {
	/**
	 * Array of current books on any shelf
	 */
	books: PropTypes.array.isRequired,
	/**
	 * Available shelves array
	 */
    shelves: PropTypes.array.isRequired,
	/**
	 * Function that will be called when the shelf is changed
	 */
	onBookShelfChange: PropTypes.func.isRequired
}

export default BookList;