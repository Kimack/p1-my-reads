import React from 'react'
import { Link } from 'react-router-dom'
import BookList from '../components/book/BookList.js'
import * as BooksAPI from '../api/BooksAPI.js'
import Spinner from 'react-spinkit';

class SearchPage extends React.Component {

	/**
	 * Max result to return from the search api
	 */
	static MAX_SEARCH_RESULTS = 20;

	state = {
		/**
		 * The current search query
		 */
		query: "",

		/**
		 * The available search results
		 */
		searchResults: [],

		/**
		 * 
		 */
		isLoading: false
	}

	componentWillReceiveProps(nextProps) {
		//if we are rcving new props we may should update the search results
		if (nextProps.books && this.state.searchResults) {
			const newSearchResults = this.mapSearchBooksWithUserBooks(this.state.searchResults, nextProps.books);
			this.setState({ searchResults: newSearchResults });
		}
	}

	mapSearchBooksWithUserBooks(searchBooks, userBooks) {
		const newSearchBooks = searchBooks.map(book => {
			const userBook = userBooks.find(userBook => (
				userBook.id === book.id
			));
			book.shelf = (userBook) ? userBook.shelf : "none"
			return book;
		});

		return newSearchBooks;
	}

	/**
	 * Handle user input for updating search query
	 * @param event
	 */
	handleQueryChange = (event) => {
		const query = event.target.value

		this.setState({ query });

		this.searchBooks(query);
	}

	/**
	 * Call the BooksAPI to search for books that match the required input (search query)
	 * @param query The search query
	 */
	searchBooks = (query) => {
		if (query.length === 0) {
			//skip the search if we do not have data to search
			this.setState({ searchResults: [], isLoading: false });
			return;
		}
		this.setState({isLoading: true});
		BooksAPI
			.search(query, this.MAX_SEARCH_RESULTS)
			.then(results => {
				if (results.error) {
					//TODO : show an error message. How to test this?
					this.setState({ searchResults: [], isLoading: false })
					return;
				}
				const searchResults = this.mapSearchBooksWithUserBooks(results, this.props.books)
				this.setState({ searchResults, isLoading: false });
			});
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" value={this.state.query} placeholder="Search by title or author" onChange={this.handleQueryChange} />
					</div>
				</div>
				{this.state.isLoading && (
					<div className="list-books-loading">
						<Spinner fadeIn="none" name="ball-pulse-sync" color="#60ac5d" />
					</div>
				)}
				{!this.state.isLoading && (
					<div className="search-books-results">
						<BookList books={this.state.searchResults} shelves={this.props.shelves} onBookShelfChange={this.props.onBookShelfChange} />
					</div>
				)}

			</div>
		)
	}
}

export default SearchPage;