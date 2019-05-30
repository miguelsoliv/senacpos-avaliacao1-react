import React from 'react'

const Form = ({ children, ...props }) => {
    return (
        <div className="columns is-multiline is-centered" style={styles}>
            <form {...props}>
                {children}
            </form>
        </div>
    )
}

const styles = {
    padding: 20,
    backgroundColor: '#e1e1e1'
}

export default Form