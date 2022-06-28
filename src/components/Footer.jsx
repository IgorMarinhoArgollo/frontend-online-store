import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default class Footer extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div className="footer">
        <h3 className="totalValue">
          {Number(
            cart.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0),
          ).toFixed(2)}
        </h3>
        <Link to="/checkout" className="payBtn">
          Finalizar Compra
        </Link>
      </div>
    );
  }
}

Footer.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.objectOf(String || Number)).isRequired,
};
