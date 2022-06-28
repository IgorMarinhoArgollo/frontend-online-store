import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import '../styles/Checkout.css';

const states = [
  { AC: 'Acre' },
  { AL: 'Alagoas' },
  { AP: 'Amapá' },
  { AM: 'Amazonas' },
  { BA: 'Bahia' },
  { CE: 'Ceará' },
  { DF: 'Distrito Federal' },
  { ES: 'Espírito Santo' },
  { GO: 'Goiás' },
  { MA: 'Maranhão' },
  { MT: 'Mato Grosso' },
  { MS: 'Mato Grosso do Sul' },
  { MG: 'Minas Gerais' },
  { PA: 'Pará' },
  { PB: 'Paraíba' },
  { PR: 'Paraná' },
  { PE: 'Pernambuco' },
  { PI: 'Piauí' },
  { RJ: 'Rio de Janeiro' },
  { RN: 'Rio Grande do Norte' },
  { RS: 'Rio Grande do Sul' },
  { RO: 'Rondônia' },
  { RR: 'Roraima' },
  { SC: 'Santa Catarina' },
  { SP: 'São Paulo' },
  { SE: 'Sergipe' },
  { TO: 'Tocantins' },
];

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.render = this.render.bind(this);
  }

  render() {
    const { cart } = this.props;
    let total = 0;
    return (
      <div>
        <Header
          cart={ cart }
        />
        {cart.length > 0
          ? (
            <div className="checkOutBody">
              <h3 className="checkOutTittle">Review Your Order</h3>
              <table className="order">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Value</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cart.map((element) => {
                      const { id, title, thumbnail, price, quantity } = element;
                      total += Number(quantity) * Number(price);
                      return (
                        <tr key={ id } className="product">
                          <td className="checkoutName">
                            <img
                              src={ thumbnail }
                              alt={ title }
                              className="checkoutThumb"
                            />
                            {title}
                          </td>
                          <td className="checkoutPrice">{Number(price).toFixed(2)}</td>
                          <td className="checkoutQuantity">{quantity}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
              <h3 className="checkoutTotal">{total}</h3>
              <form>
                <h4 className="formTitle">Personal  Information</h4>
                <label htmlFor="nome">
                  Name:
                  <input type="text" name="nome" id="nome" placeholder=" Full Name" />
                </label>
                <div className="emailPhone">
                  <label htmlFor="checkoutEmail" className="checkoutEmail">
                    Email:
                    <input
                      type="email"
                      name="email"
                      id="checkoutEmail"
                      placeholder=" Email"
                    />
                  </label>
                  <label htmlFor="phone">
                    Phone:
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder=" Phone"
                    />
                  </label>
                </div>
                <h4 className="formTitle">Delivery  Information</h4>
                <label htmlFor="address">
                  Address:
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder=" Address"
                  />
                </label>
                <div className="numberZip">
                  <label htmlFor="number">
                    Number:
                    <input type="text" name="number" id="number" placeholder=" #" />
                  </label>
                  <label htmlFor="zip">
                    ZipCode:
                    <input type="text" name="zip" id="zip" placeholder=" Zip Code" />
                  </label>
                  <label htmlFor="state">
                    State:
                    <select name="state" id="state">
                      {states.map((state) => (
                        <option
                          key={ Object.keys(state)[0] }
                          value={ Object.keys(state)[0] }
                        >
                          {Object.keys(state)[0]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="city">
                    City:
                    <input type="text" name="city" id="city" placeholder=" City" />
                  </label>
                </div>
              </form>
              <button
                className="payBtn"
                id="confirmButton"
                type="button"
                onClick={
                  // eslint-disable-next-line max-len
                  () => window.alert('Not implemented, because this project is for educational purposes, please go to a real online store')
                }
              >
                CONFIRM

              </button>
            </div>) : <p className="emptyCheckout">Your cart is empty</p>}
      </div>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
