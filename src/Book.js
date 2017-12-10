import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        bookData: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired,
        currentShelf: PropTypes.string
    }

    render() {
        const { title, imageLinks, id } = this.props.bookData
        let mainAuthor
        (this.props.bookData.authors) ? mainAuthor = this.props.bookData.authors[0] : mainAuthor = ""
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={this.props.currentShelf || "none"} onChange={(event) => { this.props.changeShelf(id, event.target.value) }}>
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