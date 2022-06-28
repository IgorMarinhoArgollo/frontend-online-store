import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../images/cart.svg';
import Home from '../images/home.svg';
import '../styles/Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updater: 0,
    };
  }

  updater = () => {
    const { updater } = this.state;
    if (updater === 0) {
      this.setState({ updater: 0 });
    } else {
      this.setState({ updater: 1 });
    }
  }

  render() {
    const { cart } = this.props;
    return (
      <header className="pageHeader" onClick={ this.updater }>
        <Link to="/" className="homeLink">
          <img src={ Home } alt="homeIcon" className="homeIcon" />
        </Link>
        <h2 className="headerTitle">Online Store</h2>
        <Link to="/cart" className="cartLink">
          <img src={ Cart } alt="cartIcon" className="cartIconHeader" id="cartIconBtn" />
          <p className="amountNumber">
            {cart.reduce((acc, curr) => (acc + curr.quantity), 0)}
          </p>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  cart: PropTypes.arrayOf(String || Number).isRequired,
};
