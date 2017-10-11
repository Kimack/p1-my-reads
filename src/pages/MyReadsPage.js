import React from 'react'
import BookShelfList from '../components/book/BookShelfList.js'
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit';
import PropTypes from 'prop-types';

class MyReadsPage extends React.Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>I Love Books</h1>
                </div>

                {this.props.isLoading ?
                    (
                        <div className="list-books-loading">
                            <Spinner fadeIn="none" name="ball-pulse-sync" color="#60ac5d" />
                        </div>
                    ) :
                    (
                        <BookShelfList
                            shelves={this.props.shelves}
                            books={this.props.books}
                            onBookShelfChange={this.props.onBookShelfChange} />
                    )
                }

                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

MyReadsPage.propTypes = {
	/**
	 * Array of current books on any shelf
	 */
    books: PropTypes.array.isRequired,
	/**
	 * Available shelves array
	 */
    shelves: PropTypes.array.isRequired,
    /**
     * Is the data still loading 
     */
    isLoading: PropTypes.bool.isRequired,
	/**
	 * Function that will be called when the shelf is changed
	 */
    onBookShelfChange: PropTypes.func.isRequired
}

export default MyReadsPage;