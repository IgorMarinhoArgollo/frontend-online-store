import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../styles/Details.css';
import Header from '../components/Header';

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
      <div className='details'>
        <header>
          <Header
            cart={ cart } />
        </header>
        <section className='detailsSection'>
          <div className="topDetails">
            <div className="leftDivDetails">
              <img src={ thumbnail } alt={title} className='itemPic' />
            </div>
            <div className="rightDivDetails">
              <h1 className='text'>Product Name:</h1>
              <h1 className='info'>{ title }</h1>
              {freeShipping && <p className='freeShippingTag'>Free Shipping</p>}
              <h3 className='price'>{price}</h3>
              <button
                type="button"
                onClick={() => {
                  setProductToCart(id, title, thumbnail, price);
                }}
                className="addBtnDetails"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className='ratingAndReviewTitle'>
            <p className='ratingTitle'>Ratings and Reviews</p>
          </div>

          <div className="rating">
            <input type="email" name="email" id="email" placeholder='email' />
            <div className="stars">

              <input type="radio" name="rate" id="5" value="5" />
              <label htmlFor="5"></label>

              <input type="radio" name="rate" id="4" value="4" />
              <label htmlFor="4"></label>

              <input type="radio" name="rate" id="3" value="3" />
              <label htmlFor="3"></label>

              <input type="radio" name="rate" id="2" value="2" />
              <label htmlFor="2"></label>

              <input type="radio" name="rate" id="1" value="1" />
              <label htmlFor="1"></label>

            </div>
            <textarea
              name="text"
              id="text"
              placeholder="Type your comment"
              cols="30"
              rows="10"
            />
            <button
              type="button"
              className='commentBtn'
              onClick={() => { window.alert('Sorry, the coment function is not implemented yet.') }}
            >
              Send Comment
            </button>
          </div>
        </section>
      </div>
    );
  }
}

Details.propTypes = {
  category: PropTypes.string.isRequired,
  match: PropTypes.shape(
    {},
  ).isRequired,
  query: PropTypes.string.isRequired,
  setProductToCart: PropTypes.func,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
