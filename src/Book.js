import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Author from './Author'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        options: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    state = {
        selectedShelf: 'none'
    }

    isSelected = (selected) => {
        return (selected)?selected : this.state.selectedShelf
    }

    handleChange = (e) => {
        const selectedShelf = e.target.value
        
        this.setState({selectedShelf})

        this.props.onShelfChange(this.props.book, selectedShelf)
    }

    render() {
        const {book, options, shelves} = this.props
        let selectedShelf = '';
        let filteredBook = ''
        
        for (let shelf in shelves) {
            filteredBook = shelves[shelf].filter(filtered => {
                return filtered === book.id
            })
            if(filteredBook.length > 0){ 
                selectedShelf = shelf
                break
            } 
        }

        return (
            <div className="book">
                <div className="book-top">
                { (book.imageLinks && book.imageLinks.thumbnail) &&
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                }
                <div className="book-shelf-changer">
                    <select value={this.isSelected(selectedShelf)} onChange={this.handleChange}>
                        <option value="move" disabled>Move to...</option>
                        {
                            options.map(
                                option => (<option key={option.id} value={option.id} >{option.name}</option>
                            ))
                        }
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{
                    book.authors && 
                        book.authors.map((author, index) => (<Author key={index} author={author} />))
                    }</div>
            </div>
        )
    }
}

export default Book