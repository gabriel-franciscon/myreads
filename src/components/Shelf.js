import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        shelf: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    render() {
        const { books, shelf, title, onChangeShelf } = this.props
        let shelfBooks = []

        if (books && books.length) {
            if (window.location.pathname === '/search') {
                shelfBooks = books
            } else {
                shelfBooks = books.filter(book => book.shelf === shelf)
            }            
        }

        return (
            <div className="bookshelf">
                {title !== 'Search' && (
                    <h2 className="bookshelf-title">{title}</h2>
                )}
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelfBooks.length ? (
                            shelfBooks.map(book => (
                                <li key={book.id}>
                                    <Book
                                        book={book}
                                        changeShelf={onChangeShelf}
                                    />
                                </li>
                            ))
                        ) : (
                            <li>
                                <h3>
                                    <Route exact path='/' render={() => 'You do not have books on this shelf.'}/> 
                                    <Route path='/search' render={() => 'No results.'}/> 
                                </h3>
                            </li>                                                                                   
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf