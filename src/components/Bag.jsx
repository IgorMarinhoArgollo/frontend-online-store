import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cart from '../images/cart.svg';
import '../styles/Bag.css';

export default class Bag extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div className="cartIcon">
        <div className="icon">
          <Link to="/cart">
            <img src={ Cart } alt="Cart" />
          </Link>
        </div>
        <p className="amount">
          { cart.reduce((acc, curr) => (acc + curr.quantity), 0)}
        </p>
      </div>
    );
  }
}

Bag.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.objectOf(String || Number)).isRequired,
};
