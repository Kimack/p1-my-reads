import React from 'react'
import { Link } from 'react-router-dom'
import BookList from '../components/book/BookList.js'
import * as BooksAPI from '../api/BooksAPI.js'
import Spinner from 'react-spinkit';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { debounce } from 'throttle-debounce';

class SearchPage extends React.Component {

	/**
	 * Time do debounc the search
	 */
	static DEBOUNCE_SEARCH = 500;

	/**
	 * Max result to return from the search api
	 */
	static MAX_SEARCH_RESULTS = 20;

	constructor() {
		super();

		this.state = {
			/**
			 * The current search query
			 */
			query: "",

			/**
			 * The available search results
			 */
			searchResults: null,

			/**
			 * If the search is being perfomed
			 */
			isLoading: false
		}

		//create a debouncer
		this.doSearch = debounce(SearchPage.DEBOUNCE_SEARCH, false, this.doSearch);
	}

	/**
	 * Update the state based on the rcv props
	 * @param {*} nextProps 
	 */
	componentWillReceiveProps(nextProps) {
		//if we are rcving new props we may should update the search results
		if (nextProps.books && this.state.searchResults) {
			const newSearchResults = this.mapSearchBooksWithUserBooks(this.state.searchResults, nextProps.books);
			this.setState({ searchResults: newSearchResults });
		}

		if (nextProps.query != null && nextProps.query !== this.state.query) {
			this.setState({ query: nextProps.query });
			this.searchBooks(nextProps.query);
		}
	}

	/**
	 * Map the current user books on the shelf with the returned books from search
	 * @param {*} searchBooks 
	 * @param {*} userBooks 
	 */
	mapSearchBooksWithUserBooks(searchBooks, userBooks) {
		const newSearchBooks = searchBooks.map(book => {
			const userBook = userBooks.find(userBook => (
				userBook.id === book.id
			));
			const newBook = {
				...book,
				shelf: (userBook) ? userBook.shelf : "none"
			}
			return newBook;
		});

		return newSearchBooks;
	}

	/**
	 * Execute the book search
	 */
	doSearch() {
		this.searchBooks(this.state.query);

		//update the browser url
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: queryString.stringify({ query: this.state.query })
		});
	}

	/**
	 * Handle user input for updating search query
	 * @param event
	 */
	handleQueryChange = (event) => {
		const query = event.target.value

		this.setState({ query });

		this.doSearch();
	};



	/**
	 * Call the BooksAPI to search for books that match the required input (search query)
	 * @param query The search query
	 */
	searchBooks = (query) => {
		if (query.length === 0) {
			//skip the search if we do not have data to search
			this.setState({ searchResults: null, isLoading: false });
			return;
		}

		this.setState({ isLoading: true });

		BooksAPI
			.search(query, SearchPage.MAX_SEARCH_RESULTS)
			.then(results => {
				if (results.error) {
					//TODO : show an error message. How to test this?
					this.setState({ searchResults: null, isLoading: false })
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
				{!this.state.isLoading && this.state.searchResults && (
					<div>
						<div className="search-books-results-size">
							{`Found ${this.state.searchResults.length} books matching your search criteria.`}
						</div>
						<div className="search-books-results">
							<BookList books={this.state.searchResults} shelves={this.props.shelves} onBookShelfChange={this.props.onBookShelfChange} />
						</div>
					</div>
				)}
			</div>
		)
	}
}

SearchPage.propTypes = {
	/**
	 * Array of current books on any shelf
	 */
	books: PropTypes.array.isRequired,
	/**
	 * Current filtering query
	 */
	query: PropTypes.string,
	/**
	 * Router history
	 */
	history: PropTypes.object.isRequired,
	/**
	 * Router Location
	 */
	location: PropTypes.object.isRequired,
	/**
	 * Available shelves array
	 */
	shelves: PropTypes.array.isRequired,
	/**
	 * Function that will be called when the shelf is changed
	 */
	onBookShelfChange: PropTypes.func.isRequired
}

export default SearchPage;