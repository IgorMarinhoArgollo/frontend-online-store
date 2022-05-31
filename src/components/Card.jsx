import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const { product, setProductToCart } = this.props;
    const { id,
      title,
      price,
      thumbnail, shipping } = product;
    const freeShipping = shipping.free_shipping;
    return (
      <div className={ id }>
        <Link to={ `details/${id}` }>
          <p>{title}</p>
          <img src={ thumbnail } alt={ title } />
        </Link>
        <p>{price}</p>
        { freeShipping ? <p>Frete Gratis</p> : ''}
        <button
          type="button"
          onClick={ () => {
            setProductToCart(id, title, thumbnail, price);
          } }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    shipping: {
      free_shipping: PropTypes.bool,
    },
  }),
  setProductToCart: PropTypes.func,
};

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
  setProductToCart: () => {},
};
