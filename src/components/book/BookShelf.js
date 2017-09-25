import React from 'react'
import BookList from './BookList.js'

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

export default BookShelf;