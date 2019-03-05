import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired,
    }

    book = this.props.book

    options = [
        { value: 'currentlyReading', text: 'Currently Reading' },
        { value: 'wantToRead', text: 'Want to Read' },
        { value: 'read', text: 'Read' },
        { value: 'none', text: 'None' }
    ]

    handleChange = event => {
        this.book.shelf = event.target.value
        this.props.changeShelf(this.book)
    };

    render() {
        const { shelf, title, authors, imageLinks } = this.book

        return (
            <div className="book">
                <div className="book-top">
                    {imageLinks && (
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${imageLinks.thumbnail})`
                        }}></div>
                    )}
                    <div className="book-shelf-changer">
                        <select onChange={this.handleChange} value={shelf}>
                            <option value="move" disabled>Move to...</option>
                            {this.options.map((option, index) => (
                                <option key={index} value={option.value}>{option.text}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors && authors.length && authors.join(', ')}</div>
            </div>
        )
    }

}

export default Book