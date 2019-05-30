import React from 'react'

const Select = ({ children, ...props }) => {
    return (
        <div className="control">
            <select {...props} className="select">
                {children}
            </select>
        </div>
    )
}

export default Select