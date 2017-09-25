import React from 'react'
import Book from './Book.js'

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

export default BookList;