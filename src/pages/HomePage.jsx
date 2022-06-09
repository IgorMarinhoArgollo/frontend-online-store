import React from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import Category from '../components/Category';
import Bag from '../components/Bag';
import "../styles/HomePage.css"

class HomePage extends React.Component {
  render() {
    const { products,
      handleChange,
      onClickSearchBtn,
      categories,
      setCategories,
      setProductsFromCategory,
      setProductToCart,
      cart } = this.props;

    return (
      <section className='home'>
        <div className='leftContent'>
          <div className='menu'>
            <p className='categoryTitle'> Categories:</p>
            <br />
            <Category
              setCategories={setCategories}
              categories={categories}
              setProductsFromCategory={setProductsFromCategory}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className='rightContent'>
          <div className='topMenu'>
            <div className='searchBar'>
              <input
                type="text"
                id="homePageInput"
                onChange={handleChange}
                placeholder="   Search"
              />
            <button
              type="button"
              onClick={onClickSearchBtn}
              id="homePageBtn"
            >
              Pesquisar
            </button>
            <Bag
              cart={cart}
            />
            </div>
          </div>
          <div className='results'>
            {products.length === 0 ? <h2>Digite algum termo de pesquisa ou escolha uma categoria.</h2> :
              products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  setProductToCart={setProductToCart}
                />
              ))}
          </div>
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  onClickSearchBtn: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCategories: PropTypes.func.isRequired,
  setProductsFromCategory: PropTypes.func.isRequired,
  setProductToCart: PropTypes.func,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

HomePage.defaultProps = {
  setProductToCart: () => { },
};

export default HomePage;
