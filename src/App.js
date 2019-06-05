import React from 'react';
import Form from './components/Form'
import Input from './components/Input'
import ListItem from './components/ListItem'
import Button from './components/Button'
import Select from './components/Select'
import { getCategories } from './services/categories'
import { getProducts, addProduct, deleteProduct } from './services/products'

class App extends React.Component {
  state = {
    product: '',
    category: '',
    list: [],
    categories: []
  }

  componentDidMount() {
    getCategories().then(result => this.setState({
      category: result[0].name,
      categories: result
    }))

    getProducts().then(result => this.setState({
      list: result
    }))
  }

  render() {
    const { product, category, list, categories } = this.state
    return (
      <React.Fragment>
        <section className="section">
          <div className="container">
            <Form onSubmit={this.handleSubmit}>
              <div className="field">
                <Input value={product} onChange={this.handleProductChange} placeholder="Produto" />
              </div>
              <div className="field">
                <Select onChange={this.handleCategoryChange} value={category}>
                  {
                    Object.keys(categories).map((keyName, index) => (
                      <option key={index}>{categories[keyName].name}</option>
                    ))
                  }
                </Select>
              </div>
              <div className="field is-pulled-right">
                <Button className="button is-dark">Adicionar</Button>
              </div>
            </Form>
          </div>
        </section>
        <section className="section">
          {
            list.map((product, index) =>
              <ListItem
                product={product}
                key={index}
                onClick={() => this.deleteProductFromList(product.id)}>
              </ListItem>
            )
          }
        </section>
      </React.Fragment>
    );
  }

  handleProductChange = event => {
    this.setState({
      product: event.target.value
    })
  }

  handleCategoryChange = event => {
    this.setState({
      category: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { product, category, list, categories } = this.state

    if (!product || !category) {
      return
    }

    addProduct({
      name: product,
      category: category
    }).then(result => this.setState({
      list: [result, ...list],
      product: '',
      category: categories[Object.keys(categories)[0]].name
    }))
  }

  deleteProductFromList = productId => {
    deleteProduct(productId)

    this.setState({
      list: this.state.list.filter((product) => product.id !== productId)
    })
  }
}

export default App;