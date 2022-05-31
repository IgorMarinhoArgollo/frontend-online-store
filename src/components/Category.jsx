import React from 'react';
import PropTypes from 'prop-types';
import "../styles/Category.css"

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
            htmlFor={category.id}
            key={category.id}
          >
            <input
              className='menuItem'
              name="category"
              type="radio"
              id={category.id}
              value={category.id}
              onClick={setProductsFromCategory}
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
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  setProductsFromCategory: PropTypes.func.isRequired,
};

export default Category;
