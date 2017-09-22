import React from 'react'
import BookShelfListItem from './BookShelfListItem.js'

const BookShelfList = ({ shelves, books, onBookShelfChange }) => (
    <div className="list-books-content">
        <div>
            <li>
                {shelves.map((shelf) => {
                    return (<ol key={shelf.id}>
                        <BookShelfListItem
                            shelf={shelf}
                            books={books.filter((book) => {
                                return book.shelf === shelf.id
                            })
                            }
                            shelves={shelves}
                            onBookShelfChange={onBookShelfChange}
                        />
                    </ol>)
                })}
            </li>
        </div>
    </div>
)

export default BookShelfList;