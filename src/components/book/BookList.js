import React from 'react'
import BookListItem from './BookListItem.js'

const BookList = ({ books, shelves, onBookShelfChange }) => (
    <ol className="books-grid">
        {
            books.map((book) => (
                <li key={book.id}>
                    <BookListItem
                        book={book}
                        shelves={shelves}
                        onBookShelfChange={onBookShelfChange} />
                </li>
            ))
        }
    </ol>
)

export default BookList;