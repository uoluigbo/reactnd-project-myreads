import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


const BookList = (props) => {
    const {books, options, onShelfChange, shelves} = props
    
    return (
        books.filter(b=> (b.imageLinks && b.imageLinks.thumbnail)).map(book => (
            <li key={book.id}><Book  book={book} options={options} onShelfChange={onShelfChange} shelves={shelves} /></li>
        ))
    )
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default BookList