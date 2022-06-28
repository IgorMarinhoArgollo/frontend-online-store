import React, { Component } from 'react';

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
  { RR: 'Roraíma' },
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
    return (
      <div>
        <form action="">
          <label htmlFor="nome">
            Nome:
            <input data-testid="checkout-fullname" type="text" name="nome" id="nome" />
          </label>
          <label htmlFor="cpf">
            CPF:
            <input data-testid="checkout-cpf" type="text" name="cpf" id="cpf" />
          </label>
          <label htmlFor="email">
            Email:
            <input data-testid="checkout-email" type="email" name="email" id="email" />
          </label>
          <label htmlFor="telefone">
            Telefone:
            <input
              data-testid="checkout-phone"
              type="text"
              name="telefone"
              id="telefone"
            />
          </label>
          <label htmlFor="cep">
            CEP:
            <input data-testid="checkout-cep" type="text" name="cep" id="cep" />
          </label>
          <label htmlFor="endereço">
            Endereço:
            <input
              data-testid="checkout-address"
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
      </div>
    );
  }
}
