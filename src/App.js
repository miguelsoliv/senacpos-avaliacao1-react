import React from 'react';
import Form from './components/Form'
import Input from './components/Input'
import ListItem from './components/ListItem'
import Button from './components/Button'
import Select from './components/Select'
import { getCategories } from './services/categories'

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
  }

  render() {
    const { product, category, list, categories } = this.state
    console.log(category)
    return (
      <div>
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
              <ListItem product={product} key={index}>
                <Button
                  onClick={() => this.deleteProduct(index)}
                  className="button is-dark is-pulled-right"
                >
                  Excluir
                </Button>
              </ListItem>)
          }
        </section>
      </div>
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
    if (!this.state.product || !this.state.category) {
      return
    }

    const { product, category, list } = this.state
    list.unshift(
      {
        name: product,
        category: category,
      })
    this.setState({
      list: list,
      product: '',
      category: this.state.categories[Object.keys(this.state.categories)[0]].name
    })
  }

  deleteProduct = index => {
    this.setState({
      list: this.state.list.filter((_, i) => i !== index)
    })
  }
}

export default App;