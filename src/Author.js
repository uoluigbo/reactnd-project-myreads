import React from 'react'
import PropTypes from 'prop-types'

const Author = (props) => {
    const author = props.author
    return (
        <p>{author}</p>
    )
}

Author.propTypes = {
    author: PropTypes.string
}

export default Author