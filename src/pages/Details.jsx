import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Bag from '../components/Bag';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        title: '',
        price: '',
        thumbnail: '',
        id: '',
        shipping: {
          free_shipping: false,
        },
      },
    };
  }

  componentDidMount() {
    this.getItensFromSearch();
  }

  getItensFromSearch = async () => {
    const { category, query, match } = this.props;
    const { id } = match.params;
    const data = await getProductsFromCategoryAndQuery(category, query);
    const result = await data.results;
    const prod = result.find((iten) => iten.id === id);
    if (prod) {
      this.setState({ product: prod });
    } else {
      const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const result2 = await response.json();
      this.setState({ product: result2 });
    }
  }

  render() {
    const { product } = this.state;
    const { id, thumbnail, title, price } = product;
    const { setProductToCart, cart } = this.props;
    const freeShipping = product.shipping.free_shipping;
    return (
      <div id={ id }>
        <Bag
          cart={ cart }
        />
        { freeShipping && <p data-testid="free-shipping">Frete Gratis</p> }
        <h1 data-testid="product-detail-name">{title}</h1>
        <h3>{price}</h3>
        <img src={ thumbnail } alt={ title } />
        <br />
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => {
            setProductToCart(id, title, thumbnail, price);
          } }
        >
          Adicionar ao Carrinho
        </button>
        <p>DETALHES</p>
        <label htmlFor="email">
          Digite seu email
          <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="1">
          1
          <input type="radio" name="rate" id="1" value="1" />
        </label>
        <label htmlFor="2">
          2
          <input type="radio" name="rate" id="2" value="2" />
        </label>
        <label htmlFor="3">
          3
          <input type="radio" name="rate" id="3" value="3" />
        </label>
        <label htmlFor="4">
          4
          <input type="radio" name="rate" id="4" value="4" />
        </label>
        <label htmlFor="5">
          5
          <input type="radio" name="rate" id="5" value="5" />
        </label>
        <br />
        <label htmlFor="text">
          Adicione seu cometario
          <textarea
            data-testid="product-detail-evaluation"
            name="text"
            id="text"
            placeholder="Digite seu comentario"
            cols="30"
            rows="10"
          />
        </label>
        <br />
        <button
          type="button"
        >
          Enviar comentario
        </button>
      </div>
    );
  }
}

Details.propTypes = {
  category: PropTypes.string.isRequired,
  match: PropTypes.shape(
    {
      params: {
        id: PropTypes.string,
      },
    },
  ).isRequired,
  query: PropTypes.string.isRequired,
  setProductToCart: PropTypes.func,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Details.defaultProps = {
  setProductToCart: () => {},
};
