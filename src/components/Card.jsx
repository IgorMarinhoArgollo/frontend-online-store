/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Shipping from '../images/truck.svg';
import '../styles/Card.css';

export default class Card extends Component {
  render() {
    const { product, setProductToCart } = this.props;
    const { id,
      title,
      price,
      thumbnail, shipping,
      available_quantity,
    } = product;
    const freeShipping = shipping.free_shipping;
    return (
      <div className="card">
        <div className="leftDiv">
          <Link to={ `details/${id}` } className="link">
            <img src={ thumbnail } alt={ title } />
          </Link>
        </div>

        <div className="rightDiv">
          <Link to={ `details/${id}` } className="link">
            <p className="productName">{title}</p>
            <p className="price">
              R$:
              {price}
            </p>
          </Link>
          <button
            className="addBtn"
            type="button"
            onClick={ () => {
              setProductToCart(id, title, thumbnail, price,
                available_quantity);
            } }
          >
            Add
          </button>
          {freeShipping
            ? (
              <div className="shipping">
                {' '}
                <p className="shippingText">Free Shipping</p>
                <img src={ Shipping } alt="shippingIcon" className="shippingIcon" />
                {' '}
              </div>)
            : ''}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    available_quantity: PropTypes.number.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setProductToCart: PropTypes.func.isRequired,
};
