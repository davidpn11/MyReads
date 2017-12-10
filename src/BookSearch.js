import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

    static propTypes = {
        addBook: PropTypes.func.isRequired
    }

    state = {
        searchedBooks: []
    }

    searchBook = (query) => {
        if (query) {
            BooksAPI.search(query).then(searchedBooks => {
                 this.setState({ searchedBooks })
            });
        }
    }

    changeShelf = (bookId, newShelf) => {
        // console.log(bookId, newShelf)
        let selectedBook = this.state.searchedBooks.find((b) => b.id === bookId)
        selectedBook.shelf = newShelf
        this.props.addBook(selectedBook)
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={(event) => this.searchBook(event.target.value)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchedBooks.map(book => {
                            // console.log(book.title, book.authors)
                         return  <Book key={book.id} bookData={book} changeShelf={this.changeShelf} />
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookSearch;