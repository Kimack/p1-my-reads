import React from 'react'
import BookShelfList from '../components/book/BookShelfList.js'
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit';

class MyReadsPage extends React.Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>I Love Books</h1>
                </div>

                {this.props.isLoading && (
                    <div className="list-books-loading">
                        <Spinner fadeIn="none" name="ball-pulse-sync" color="#60ac5d" />
                    </div>
                )}

                {!this.props.isLoading && (
                    <BookShelfList
                        shelves={this.props.shelves}
                        books={this.props.books}
                        onBookShelfChange={this.props.onBookShelfChange} />
                )}

                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default MyReadsPage;