import React, { Component } from 'react';
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {

    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        booksArray: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

    changeShelf = (bookId, newShelf) => {
        this.props.changeShelf(bookId, newShelf)
    }

    render() {
        let { booksArray, shelfTitle } = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksArray.map(book => (
                            <Book key={book.id} bookData={book} currentShelf={book.shelf} changeShelf={this.changeShelf} />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;