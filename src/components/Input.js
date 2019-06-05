import React from 'react'

const Input = ({ ...props }) => {
    return (
        <input {...props} type="text" className="input" />
    )
}

export default Input