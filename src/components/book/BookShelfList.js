import React from 'react'
import BookShelf from './BookShelf.js'
import PropTypes from 'prop-types';

const BookShelfList = ({ shelves, books, onBookShelfChange }) => (
    <div className="list-books-content">
            <ul>
                {shelves.map((shelf) => {
                    return (<ol key={shelf.id}>
                        <BookShelf
                            shelf={shelf}
                            books={
                                books.filter((book) => {
                                    return book.shelf === shelf.id
                                })
                            }
                            shelves={shelves}
                            onBookShelfChange={onBookShelfChange}
                        />
                    </ol>)
                })}
            </ul>
    </div>
)

BookShelfList.propTypes = {
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

export default BookShelfList;