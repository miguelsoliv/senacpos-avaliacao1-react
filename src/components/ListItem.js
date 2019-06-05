import React from 'react'
import Button from './Button'

const ListItem = ({ product, ...props }) => {
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
                    <Button {...props} className="button is-dark is-pulled-right">
                        Excluir
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ListItem