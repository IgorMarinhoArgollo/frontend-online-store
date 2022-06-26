/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Category.css';

class Category extends React.Component {
  componentDidMount() {
    const { setCategories } = this.props;
    setCategories();
  }

  render() {
    const { categories, setProductsFromCategory } = this.props;
    return (
      <div className='categoryMenu'>
        {categories.map((category) => (
          <label
            htmlFor={ category.id }
            key={ category.id }
          >
            <input
              className='menuItem'
              name="category"
              type="radio"
              id={ category.id }
              value={ category.id }
              onClick={ setProductsFromCategory } 
            />
            <p>{category.name}</p>
          </label>
        ))}
      </div>
    );
  }
}

Category.propTypes = {
  setCategories: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  categories: PropTypes.arrayOf(PropTypes.objectOf(String || Number)).isRequired,
  setProductsFromCategory: PropTypes.func.isRequired,
};

export default Category;
