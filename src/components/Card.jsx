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
      thumbnail, shipping } = product;
    const freeShipping = shipping.free_shipping;
    return (
      <div className='card'>
        <div className='leftDiv'>
          <Link to={`details/${id}`} className="link">
            <img src={thumbnail} alt={title} />
          </Link>
        </div>

        <div className='rightDiv'>
          <Link to={`details/${id}`} className="link">
            <p className='productName'>{title}</p>
            <p className='price'>R$:{price}</p>
          </Link>
          <button
            className='addBtn'
            type="button"
            onClick={() => {
              setProductToCart(id, title, thumbnail, price);
            }}
          >
            Add
          </button>
          {freeShipping ? <div className='shipping'>
            <p className='shippingText'>
              Free Shipping</p>
            <img src={Shipping} alt="shippingIcon" className='shippingIcon' />
          </div> : ''}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  free_shipping: PropTypes.bool,
  id: PropTypes.string,
  price: PropTypes.string,
  product: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.number,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool
    }),
    thumbnail: PropTypes.string,
    title: PropTypes.string
  }),
  setProductToCart: PropTypes.func,
  shipping: PropTypes.shape({
    free_shipping: PropTypes.bool
  }),
  thumbnail: PropTypes.string,
  title: PropTypes.string
}

Card.defaultProps = {
  product: {
    id: '',
    title: '',
    thumbnail: '',
    price: '',
    shipping: {
      free_shipping: false,
    },
  },
  setProductToCart: () => { },
};
