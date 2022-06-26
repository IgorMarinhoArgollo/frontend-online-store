/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

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
    const id = target.className;
    const { cart } = this.state;
    const prod = cart.find((product) => id === product.id);
      prod.quantity += 1;
      this.setState({ cart });
      localStorage.setItem('Cart', JSON.stringify(cart));
  }

  decreaseButton = ({ target }) => {
    const id = target.className;
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
    const id = target.className;
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
          <div className='bodyOfCart'>
          {
            cart.map((prod) => {
              const { id, thumbnail, price, title, quantity } = prod;
              return (
                <div key={ id } className='listedProduct'>
                  <h3 className='productName'>
                    {title}
                  </h3>
                  <img src={ thumbnail } alt={ title } className="productThumb"/>
                  <h5 className='productPrice'>{price}</h5>
                  <button
                    type="button"
                    className={ id }
                    onClick={ this.decreaseButton }
                  >
                    decrease
                  </button>
                  <label htmlFor={ id }>
                    <p id={ id } className='productQuantity'>
                      {quantity}
                    </p>
                  </label>
                  <button
                    type="button"
                    className={ id }
                    onClick={ this.addButton }
                  >
                    increase
                  </button>
                  <br />
                  <br />
                  <button
                    type="button"
                    className={ id }
                    onClick={ this.removeItem }
                  >
                    remove
                  </button>
                </div>
              );
            })
          }
          <Footer cart={ this.state.cart }/>
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
        <h2 >Seu carrinho está vazio</h2>
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

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.objectOf(String || Number)).isRequired,
};
