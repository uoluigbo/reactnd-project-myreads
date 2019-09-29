import React from 'react'
import PropTypes from 'prop-types'

const Bookshelf = (props) => {
    const {options, shelf} = props

    return (
        <h2 className="bookshelf-title">
           { options.filter(option => (option.id === shelf))
            .map(filtered => (filtered.name))}
        </h2>
    )
}

Bookshelf.propTypes = {
    shelf: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}

export default Bookshelf