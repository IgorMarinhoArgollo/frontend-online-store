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
                      console.log(total);
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
                          <td className="checkoutPrice">{price}</td>
                          <td className="checkoutQuantity">{quantity}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
              <form action="">
                <label htmlFor="nome">
                  Nome:
                  <input type="text" name="nome" id="nome" />
                </label>
                <label htmlFor="cpf">
                  CPF:
                  <input type="text" name="cpf" id="cpf" />
                </label>
                <label htmlFor="email">
                  Email:
                  <input type="email" name="email" id="email" />
                </label>
                <label htmlFor="telefone">
                  Telefone:
                  <input
                    type="text"
                    name="telefone"
                    id="telefone"
                  />
                </label>
                <label htmlFor="cep">
                  CEP:
                  <input type="text" name="cep" id="cep" />
                </label>
                <label htmlFor="endereço">
                  Endereço:
                  <input
                    type="text"
                    name="endereço"
                    id="endereço"
                  />
                </label>
                <label htmlFor="complemento">
                  Complemento:
                  <input type="text" name="complemento" id="complemento" />
                </label>
                <label htmlFor="numero">
                  Numero:
                  <input type="number" name="numero" id="numero" />
                </label>
                <label htmlFor="cidade">
                  Cidade:
                  <input type="text" name="cidade" id="cidade" />
                </label>
                <label htmlFor="estado">
                  Estado:
                  <select name="estado" id="estado">
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
              </form>
            </div>) : <p className="emptyCheckout">Your cart is empty</p>}
      </div>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
