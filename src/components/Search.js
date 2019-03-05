import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import { search } from '../BooksAPI'

class Search extends Component {

	static propTypes = {
        currentBooks: PropTypes.array.isRequired,
        onRenderShelf: PropTypes.func.isRequired
    }

	state = {
		query: '',
		books: []
	}

	clearSearch = () => {
		this.setState(() => ({
			query: '',
			books: []
		}))
	}

	updateQuery = query => {
		if (query.trim()) {
			search(query.trim()).then(result => {

				if (result.error) {
					this.clearSearch()
					return
				}

				const { currentBooks } = this.props

				result.length && result.forEach(book => {					
					const filteredBooks = currentBooks.find(el => el.id === book.id)
					book.shelf = filteredBooks && filteredBooks.shelf ? filteredBooks.shelf : 'none'
				});				

				this.setState(() => ({
					books: result
				}))
			});
		} else {
			this.clearSearch();
		}
	}

	render() {
		const { books } = this.state
		const { onRenderShelf } = this.props

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={event => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<Shelf title='Search' shelf='search' books={books} onChangeShelf={onRenderShelf} />
				</div>
			</div>
		)
	}
}

export default Search