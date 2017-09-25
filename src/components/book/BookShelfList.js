import React from 'react'
import BookShelf from './BookShelf.js'

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

export default BookShelfList;