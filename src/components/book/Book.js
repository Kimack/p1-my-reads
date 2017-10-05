import React from 'react'
import Spinner from 'react-spinkit';
import PropTypes from 'prop-types';

class Book extends React.Component {

    state = {
        /**
         * Indicate if the item is still being processed
         */
        isUpdating: false
    }

    /**
     * @return the image url or empty if the image does not exist
     * TODO: Add placeholder image
     */
    getImageUrl = () => {
        const { book } = this.props;
        return book.imageLinks ? book.imageLinks.thumbnail : ""
    }

    /**
     * @return the current book shelf or none 
     */
    getBookShelf = () => {
        const { book } = this.props;
        return book.shelf ? book.shelf : "none";
    }

    /**
     * Called when the users wants to changed the book shelf
     */
    onBookShelfChange = (event) => {
        const { book, onBookShelfChange } = this.props;
        this.setState({ isUpdating: true });
        onBookShelfChange(book, event.target.value)
    }

    render() {
        const { book, shelves } = this.props;
        return (
            <div className="book">

                <div className="book-top">
                    {this.state.isUpdating ?
                        (
                            <div className="book-loading">
                                <Spinner className="books-loading-spinner" fadeIn="none" name="ball-pulse-sync" color="#60ac5d" />
                            </div>
                        ) :
                        (
                            <div className="book-shelf-changer">
                                <select onChange={this.onBookShelfChange} value={this.getBookShelf()}>
                                    <option value="none" disabled>Move to...</option>
                                    {shelves.map((shelf) => {
                                        return (<option key={shelf.id} value={shelf.id}>{shelf.title}</option>)
                                    })}
                                    <option value="none">None</option>
                                </select>
                            </div>
                        )}
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.getImageUrl()}")` }}></div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

Book.propTypes = {
	/**
	 * Current book
	 */
    book: PropTypes.object.isRequired,
	/**
	 * Available shelves array
	 */
    shelves: PropTypes.array.isRequired,
	/**
	 * Function that will be called when the shelf is changed
	 */
    onBookShelfChange: PropTypes.func.isRequired
}

export default Book;