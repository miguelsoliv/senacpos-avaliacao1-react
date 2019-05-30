import React from 'react'

const ListItem = ({ children, product }) => {
    return (
        <div className="columns is-multiline is-centered">
            <div className="card column is-one-third">
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{product.name}</p>
                        </div>
                    </div>
                    <div className="content">{product.category}</div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ListItem