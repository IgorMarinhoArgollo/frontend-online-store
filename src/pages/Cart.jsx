import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Cart.css';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  addButton = ({ target }) => {
    const { id } = target;
    const { cart } = this.state;
    const inStock = cart.find((element) => element.id === id);
    if (inStock.quantity < inStock.available_quantity) {
      inStock.quantity += 1;
      this.setState({ cart });
      localStorage.setItem('Cart', JSON.stringify(cart));
    }
  }

  decreaseButton = ({ target }) => {
    const { id } = target;
    const { cart } = this.state;
    const prod = cart.find((product) => id === product.id);
    if (prod.quantity > 1) {
      prod.quantity -= 1;
      this.setState({ cart });
      localStorage.setItem('Cart', JSON.stringify(cart));
    } else {
      const newCart = cart.filter((element) => element !== prod);
      this.setState({ cart: newCart });
      localStorage.setItem('Cart', JSON.stringify(newCart));
    }
  }

  removeItem = ({ target }) => {
    const { id } = target;
    const { cart } = this.state;
    const prod = cart.find((product) => id === product.id);
    const newCart = cart.filter((element) => element !== prod);
    this.setState({ cart: newCart });
    localStorage.setItem('Cart', JSON.stringify(newCart));
  }

  renderCart() {
    const { cart } = this.state;
    if (cart.length > 0) {
      return (
        <div>
          <header>
            <Header
              cart={ cart }
            />
          </header>
          <div className="bodyOfCart">
            {
              cart.map((prod) => {
                const { id, thumbnail, price, title, quantity } = prod;
                return (
                  <div key={ id } className="listedProduct">
                    <div className="titleThumb">
                      <img src={ thumbnail } alt={ title } className="productThumb" />
                      <h3 className="productName">
                        {title}
                      </h3>
                      <h5 className="productPrice">{price}</h5>

                    </div>
                    <div className="buttons">
                      <button
                        type="button"
                        id={ id }
                        onClick={ this.addButton }
                        className="cartButtons"
                      >
                        increase
                      </button>
                      <label htmlFor={ id }>
                        <p id={ id } className="productQuantity">
                          {quantity}
                        </p>
                      </label>
                      <button
                        type="button"
                        id={ id }
                        onClick={ this.decreaseButton }
                        className="cartButtons"
                      >
                        decrease
                      </button>
                      <button
                        type="button"
                        id={ id }
                        onClick={ this.removeItem }
                        className="cartButtons removeButton"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                );
              })
            }
            <Footer cart={ cart } />
          </div>
        </div>
      );
    }
    return (
      <div>
        <header>
          <Header
            cart={ cart }
          />
        </header>
        <h2>Seu carrinho está vazio</h2>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.renderCart() }
      </div>
    );
  }
}
