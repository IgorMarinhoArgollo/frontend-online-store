import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cart from '../images/Carrinho.svg';

export default class Bag extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div>
        <Link to="/cart">
          <img src={Cart} alt="Cart" />
        </Link>
        <p>
          {cart.reduce((acc, curr) => (acc + curr.quantity), 0)}
        </p>
      </div>
    );
  }
}

Bag.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
