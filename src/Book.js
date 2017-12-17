import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from './icons/spinner.svg'

class Book extends Component {
    static propTypes = {
        bookData: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired,
        currentShelf: PropTypes.string,
        openBookDetails: PropTypes.func.isRequired
    }

    state = {
        loadingSpinner: false
    }

    startLoading() {
        this.setState({ loadingSpinner: true })
    }

    openBook = () => {
        this.props.openBookDetails(this.props.bookData)
    }

    changingShelf = (id, newShelf) => {
        this.startLoading()
        this.props.changeShelf(id, newShelf)
    }

    render() {
        const { title, imageLinks, id } = this.props.bookData
        let mainAuthor
        (this.props.bookData.authors) ? mainAuthor = this.props.bookData.authors[0] : mainAuthor = ""
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"  onClick={this.openBook} style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})` }}></div>
                        { this.state.loadingSpinner ? <img className="loading-spinner" src={Spinner} alt="Spinner"/> : <div></div>}
                        <div className="book-shelf-changer">
                            <select defaultValue={this.props.currentShelf || "none"} onChange={(event) => { this.changingShelf(id, event.target.value)}}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{mainAuthor}</div>
                </div>
            </li>
        );
    }
}

export default Book;