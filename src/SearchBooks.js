import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookList from './BookList';

class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onSearch: PropTypes.func.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    state = {
        text: ''
    }

    errorMessage = 'No results found.'

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.text){
            this.props.onSearch(this.state.text);
        }
    }

    handleChange = (e) => {
        const value = (e.target.value)

        this.updateText(value)

        if(this.state.text){
            this.props.onSearch(value)
        }
    }

    updateText = (query) => {
        this.setState({text: query})
    }

    clearText = () => {
        this.updateQuery('')
    }

    render() {
        const {books, onShelfChange, options, shelves, searchError} = this.props
        const { text } = this.state

        const displayedBooks = (text === '') 
                            ?[]
                            : books

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={this.state.text}
                            onChange={this.handleChange}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    { (searchError && text) &&
                        <div className="error" >
                        {this.errorMessage}
                    </div>
                    }
                    
                    <ol className="books-grid">
                        <BookList books={displayedBooks} options={options} onShelfChange={onShelfChange} shelves={shelves}/>
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks