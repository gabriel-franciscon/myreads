import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Shelf from './components/Shelf'
import Search from './components/Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
	state = {
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			this.setState({ books })
		})
	}

	removeBook = book => {
		this.setState(state => ({
			books: state.books.filter(b => b.id !== book.id)
		}));
	}

	changeShelf = book => {
		this.removeBook(book)

		BooksAPI.update({ id: book.id }, book.shelf).then(() => {
			this.setState(state => ({
				books: state.books.concat([book])
			}))
		})
	}

	render() {
		const { books } = this.state
		const { changeShelf } = this

		return (
			<div className='app'>
				<Route exact path='/' render={() => (
					<React.Fragment>
						<div className='list-books'>
							<div className='list-books-title'>
								<h1>MyReads</h1>
							</div>
							<div className='list-books-content'>
								<Shelf title='Currently Reading' shelf='currentlyReading' books={books} onChangeShelf={changeShelf} />
								<Shelf title='Want to Read' shelf='wantToRead' books={books} onChangeShelf={changeShelf} />
								<Shelf title='Read' shelf='read' books={books} onChangeShelf={changeShelf} />
							</div>
						</div>
						<div className="open-search">
							<Link to='/search'>Add a book</Link>
						</div>
					</React.Fragment>
				)} />
				<Route path='/search' render={() => (
					<Search currentBooks={books} onRenderShelf={changeShelf}/>
				)}/>
			</div>
		)
	}
}

export default BooksApp
