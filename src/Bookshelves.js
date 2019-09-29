import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import Bookshelf from './Bookshelf'

class Bookshelves extends Component  {
    render() {
        const {books, options, onShelfChange, selectedShelves} = this.props
        const shelves = []
        let shelf = '';
        let booklist = []
        const bookshelves = []

        for (let book of books) {
            if(shelf !== book.shelf) {
                shelves.push(book.shelf)
                shelf = book.shelf
            }
        }

        for (let shelf in selectedShelves ) {
            if(shelf){

                booklist = selectedShelves[shelf].map(id => {
                    const obj = books.filter(book => book.id === id) 
                    return obj[0]
                })

            bookshelves.push( <div key={shelf} className="bookshelf">
                <Bookshelf options={options} shelf={shelf} onShelfChange={onShelfChange} />
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        <BookList books={booklist} options={options} onShelfChange={onShelfChange}  shelves={selectedShelves} />
                    </ol>
                </div>
            </div>)
            }     
        }

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                   
                   {bookshelves}
                   
                    {/*
                       shelves.map( shelf => {
                        booklist = books.filter(book => book.shelf === shelf)

                        return <div key={shelf} className="bookshelf">
                            <Bookshelf options={options} shelf={shelf} onShelfChange={onShelfChange} />
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    <BookList books={booklist} options={options} onShelfChange={onShelfChange} shelves={selectedShelves} />
                                </ol>
                            </div>
                        </div>
                       }) 
                    */}
                
              </div>
            </div>

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
    }
}

Bookshelves.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default Bookshelves