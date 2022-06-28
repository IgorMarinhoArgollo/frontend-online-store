import React from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import Category from '../components/Category';
import Bag from '../components/Bag';
import Search from '../images/search.svg';
import Hide from '../images/hide.svg';
import Show from '../images/show.svg';

import '../styles/HomePage.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: false,
    };

    this.showHide = this.showHide.bind(this);
  }

  componentDidMount() {
    this.showHide();
  }

  showHide() {
    const { menu } = this.state;
    this.setState({
      menu: !menu,
    });
    if (menu === true) {
      document.getElementsByClassName('leftContent')[0].style.display = 'none';
    } else {
      document.getElementsByClassName('leftContent')[0].style.display = 'flex';
    }
  }

  render() {
    const { products,
      handleChange,
      onClickSearchBtn,
      categories,
      setCategories,
      setProductsFromCategory,
      setProductToCart,
      cart,
      category,
      query,
    } = this.props;

    const { menu } = this.state;

    return (
      <div>
        <header>
          <div className="menuOptions">
            {menu
              ? (
                <img
                  src={ Hide }
                  alt="hideIcon"
                  className="menuIcons"
                  onClick={ this.showHide }
                  onKeyDown={ this.showHide }
                />
              )
              : (
                <img
                  src={ Show }
                  alt="showIcon"
                  className="menuIcons"
                  onClick={ this.showHide }
                  onKeyDown={ this.showHide }
                />)}
          </div>
          <h2 className="title">
            Online Store
          </h2>
        </header>
        <main className="home">
          <section className="leftContent">
            <div className="menu">
              <p className="categoryTitle"> Categories:</p>
              <br />
              <Category
                setCategories={ setCategories }
                categories={ categories }
                setProductsFromCategory={ setProductsFromCategory }
                handleChange={ handleChange }
              />
            </div>
          </section>
          <section className="rightContent">
            <div className="topMenu">
              <div className="searchBar">
                <input
                  type="text"
                  id="homePageInput"
                  onChange={ handleChange }
                  placeholder="   Search"
                  name="query"
                />
                <button
                  type="button"
                  onClick={ onClickSearchBtn }
                  id="homePageBtn"
                >
                  <img src={ Search } alt="searchIcon" className="searchBtn" />
                </button>
              </div>
              <Bag
                cart={ cart }
              />
            </div>
            <div className="query">
              {category ? (
                <div className="queries">
                  <h4>Category:</h4>
                  <p>{categories.find((element) => element.id === category).name}</p>
                </div>)
                : <p>  </p>}
              {query ? (
                <div className="queries">
                  <h4>Query:</h4>
                  <p>{query}</p>
                </div>)
                : <p>  </p>}
            </div>
            <section className="results">
              {products.length === 0 ? <h2>Make Your Search</h2>
                : products.map((product) => (
                  <Card
                    key={ product.id }
                    product={ product }
                    setProductToCart={ setProductToCart }
                  />
                ))}
            </section>
          </section>
        </main>
      </div>
    );
  }
}

HomePage.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  category: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClickSearchBtn: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  query: PropTypes.string.isRequired,
  setCategories: PropTypes.func.isRequired,
  setProductToCart: PropTypes.func.isRequired,
  setProductsFromCategory: PropTypes.func.isRequired,
};

export default HomePage;
