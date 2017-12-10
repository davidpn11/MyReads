import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
      console.log(books);
    })
  }

  changeBookShelf = (bookId, newShelf) => {
    let bookIndex = this.state.books.findIndex(book => book.id === bookId)
    let newBooks = this.state.books[bookIndex].shelf = newShelf
    BooksAPI.update(this.state.books[bookIndex], newShelf)
      .then(result => {
        this.setState({ newBooks })
      }).catch(err => {
        console.log(err)
      })
  }

  addBooks = (searchedBook) => {
    let hasBook = this.state.books.find((b) => b.id === searchedBook.id)
    if (hasBook) {
      this.changeBookShelf(searchedBook.id, searchedBook.shelf)
    } else {
      BooksAPI.update(searchedBook, searchedBook.shelf)
        .then(result => {
          this.setState(state => ({
            books: state.books.concat([searchedBook])
          }))
        }).catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <div className="app">
        {/* ROOT ROUTE */}
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf shelfTitle="Currently Reading" changeShelf={this.changeBookShelf} booksArray={this.state.books.filter(b => b.shelf === 'currentlyReading')} />
                <Bookshelf shelfTitle="Want to Read" changeShelf={this.changeBookShelf} booksArray={this.state.books.filter(b => b.shelf === 'wantToRead')} />
                <Bookshelf shelfTitle="Read" changeShelf={this.changeBookShelf} booksArray={this.state.books.filter(b => b.shelf === 'read')} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a Book</Link>
            </div>
          </div>
        )} />
        {/* SEARCH ROUTE */}
        <Route path='/search' render={() => (
          <BookSearch addBook={this.addBooks} />
        )} />
      </div>
    )
  }
}

export default BooksApp
