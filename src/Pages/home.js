import React from 'react';
import { connect } from 'react-redux'
import Form from '../components/Form'
import Input from '../components/Input'
import ListItem from '../components/ListItem'
import Button from '../components/Button'
import Select from '../components/Select'
import { loadCategories, setCategory } from '../redux/reducers/category'
import { loadProducts, insertProduct, removeProduct } from '../redux/reducers/products'

class Home extends React.Component {
  state = {
    product: ''
  }

  componentDidMount() {
    this.props.loadCategories()
    this.props.loadProducts()
  }

  render() {
    const { product } = this.state
    const { selectedCategory, categories, isCategoriesLoading, products, isProductsLoading } = this.props
    let contentCategories, contentProducts;

    if (isCategoriesLoading) {
      contentCategories = <span>Carregando Categorias...</span>
    } else {
      contentCategories = <Select onChange={this.handleCategoryChange} value={selectedCategory}>
        {
          Object.keys(categories).map((keyName, index) => (
            <option key={index} value={categories[keyName].id}>
              {categories[keyName].name}
            </option>
          ))
        }
      </Select>
    }

    if (isProductsLoading) {
      contentProducts = <span>Carregando Lista de Produtos...</span>
    } else {
      contentProducts = products.map((product, index) =>
        <ListItem
          product={product}
          key={index}
          onClick={() => this.deleteProductFromList(product.id)}>
        </ListItem>
      )
    }

    return (
      <React.Fragment>
        <section className="section">
          <div className="container">
            <Form onSubmit={this.handleSubmit}>
              <div className="field">
                <Input value={product} onChange={this.handleProductChange} placeholder="Produto" />
              </div>
              <div className="field">
                {contentCategories}
              </div>
              <div className="field is-pulled-right">
                <Button className="button is-dark">Adicionar</Button>
              </div>
            </Form>
          </div>
        </section>
        <section className="section">
          {contentProducts}
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
    this.props.setCategory(event.target.value)
  }

  handleSubmit = event => {
    event.preventDefault()
    const { product } = this.state
    const { selectedCategory, categories } = this.props

    if (!product || selectedCategory < 1) {
      return
    }

    this.props.insertProduct(product, categories[Object.keys(categories)[selectedCategory - 1]].name)
      .then(this.setState({
        product: ''
      }))

    this.props.setCategory(categories[Object.keys(categories)[0]].id)
  }

  deleteProductFromList = productId => {
    this.props.removeProduct(productId)
  }
}

const mapStateToProps = state => {
  return {
    selectedCategory: state.categoriesReducer.selectedCategory,
    categories: state.categoriesReducer.categories,
    isCategoriesLoading: state.categoriesReducer.isLoading,
    products: state.productsReducer.products,
    isProductsLoading: state.productsReducer.isLoading
  }
}

const mapDispatchToProps = {
  loadCategories, setCategory,
  loadProducts, insertProduct, removeProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)