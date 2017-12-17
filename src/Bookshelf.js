import React, { Component } from 'react';
import Book from './Book'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
class Bookshelf extends Component {

    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        booksArray: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

    state = {
        modalIsOpen: false,
        currentBook: {}
    }

    componentDidMount() {

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({ modalIsOpen: true })
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    changeShelf = (bookId, newShelf) => {
        this.props.changeShelf(bookId, newShelf)
    }

    openBookDetails = (bookData) => {
        this.setState({ currentBook: bookData });
        this.openModal()
    }

    render() {
        let { booksArray, shelfTitle } = this.props
        return (
            <div className="bookshelf">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={modalStyle}
                    contentLabel="Example Modal">
                    <div>
                        <button className="close-modal" onClick={this.closeModal}>close</button>
                        <h2>{this.state.currentBook.title}</h2>
                        <div>I am a modal</div>
                        <div>
                            {/* {this.state.currentBook ? <img  src={this.state.currentBook.imageLinks.thumbnail}/> : <div></div> } */}
                            <div className="image-modal"></div>
                            <div className="description-modal"></div>
                        </div>
                    </div>
                </Modal>
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksArray.map(book => (
                            <Book key={book.id} bookData={book} currentShelf={book.shelf} changeShelf={this.changeShelf} openBookDetails={this.openBookDetails} />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;