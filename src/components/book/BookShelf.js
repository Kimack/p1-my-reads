import React from 'react'
import BookList from './BookList.js'
import PropTypes from 'prop-types';

const BookShelf = ({ shelf, books, shelves, onBookShelfChange }) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}({books.length})</h2>
        <div className="bookshelf-books">
            <BookList
                books={books}
                shelves={shelves}
                onBookShelfChange={onBookShelfChange} />
        </div>
    </div>
)

BookShelf.propTypes = {
    /**
     * Current shelf
     */
    shelf: PropTypes.object.isRequired,
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

export default BookShelf;