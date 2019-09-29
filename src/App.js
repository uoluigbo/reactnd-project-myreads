import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks'
import Bookshelves from './Bookshelves'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResult: [],
    shelves: {currentlyReading: [], wantToRead: [], read: []},
    searchError: false
  }

  bookshelfOpts = {
    currentlyReading : "Currently Reading",
    wantToRead : "Want to Read",
    read : "Read"
  }

  bookshelfOptions = [
    {id: 'currentlyReading', name: 'Currently Reading'},
    {id: 'wantToRead', name: 'Want To Read'},
    {id: 'read', name: 'Read'}
  ]

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      const shelves = {}
      for (let book of books ) {
        if(!shelves[book.shelf]){
          shelves[book.shelf] = []
        }

        shelves[book.shelf].push(book.id)
      }

      this.setState(() => ({
        books,
        searchResult: [],
        shelves: shelves
      }))
    })
  }

  searchLibrary = (querystring) => {
    if(querystring) {
      BooksAPI.search(querystring)
      .then((books) => {
        const searchError = (books.error)?true:false

        this.setState({
          searchResult: (books && books.length > 0)?books:[],
          searchError
        })
  
      })
    }
  }

  fetchBooks = () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  updateBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then((result) => {
      //this.fetchBooks()
      book.shelf = shelf

      if(Object.keys(result).length > 0 && !result.error) { 
        this.setState((prevState) => ({
          shelves: result,
          books: (prevState.books.filter(b=> b.id !== book.id)).concat(book)
        }))
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks 
            books={this.state.searchResult}
            options={this.bookshelfOptions}
            onShelfChange={this.updateBookshelf}
            shelves={this.state.shelves}
            onSearch={this.searchLibrary}
            searchError={this.state.searchError}
          />
        )}
        
        />
        <Route exact path="/" render={() => (
          <Bookshelves
            books={this.state.books}
            options={this.bookshelfOptions}
            onShelfChange={this.updateBookshelf}
            selectedShelves={this.state.shelves}
           />
        )} 
        />
      </div>
    )
  }
}

export default BooksApp
