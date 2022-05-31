import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Checkout from './pages/Checkout';
import HomePage from './pages/HomePage';
import Details from './pages/Details';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Cart from './pages/Cart';
import "./styles/App.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      query: '',
      category: '',
      cart: [],
    };
  }

  componentDidMount() {
    this.getCartFromLocalStorage();
  }

  getCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('Cart'));
    if (cart) {
      this.setState({ cart });
    }
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  setCategories = async () => {
    const data = await getCategories();
    this.setState({ categories: data });
  }

  onClickSearchBtn = async () => {
    const { query, category } = this.state;
    const data = await getProductsFromCategoryAndQuery(category, query);
    const result = await data.results;
    this.setState({ products: result });
  }

  setProductToCart = (id, title, thumbnail, price) => {
    const product = {
      id,
      title,
      thumbnail,
      price,
      quantity: 1,
    };
    const lastCart = JSON.parse(localStorage.getItem('Cart'));
    if (lastCart) {
      const ifExist = lastCart.find((element) => element.id === product.id);
      if (ifExist) {
        ifExist.quantity += 1;
        const cart = [...lastCart];
        localStorage.setItem('Cart', JSON.stringify(cart));
        this.getCartFromLocalStorage();
      } else {
        const cart = [...lastCart, product];
        localStorage.setItem('Cart', JSON.stringify(cart));
        this.getCartFromLocalStorage();
      }
    } else {
      const cart = [product];
      localStorage.setItem('Cart', JSON.stringify(cart));
      this.getCartFromLocalStorage();
    }
  }

  setProductsFromCategory = async (event) => {
    this.handleChange(event);
    const { target } = event;
    const category = target.value;
    const { query } = this.state;
    const data = await getProductsFromCategoryAndQuery(category, query);
    const result = await data.results;
    this.setState({ products: result });
  }

  render() {
    const { categories, products, category, query, cart } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (<HomePage
                products={ products }
                handleChange={ this.handleChange }
                onClickSearchBtn={ this.onClickSearchBtn }
                setCategories={ this.setCategories }
                categories={ categories }
                setProductsFromCategory={ this.setProductsFromCategory }
                setProductToCart={ this.setProductToCart }
                cart={ cart }
              />) }
            />
            <Route
              exact
              path="/cart"
              render={ () => (<Cart
                products={ products }
              />) }
            />
            <Route
              exact
              path="/details/:id"
              render={ (props) => (<Details
                products={ products }
                category={ category }
                query={ query }
                setProductToCart={ this.setProductToCart }
                { ...props }
                cart={ cart }
              />) }
            />
            <Route
              path="/checkout"
              component={ Checkout }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
