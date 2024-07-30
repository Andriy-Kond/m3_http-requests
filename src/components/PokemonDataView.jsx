import React, { Component } from "react";

class PokemonDataView extends Component {
  render() {
    const {
      pokemon: { name, sprites, stats },
    } = this.props;

    return (
      <div>
        <h2>Ім'я покемона: {name}</h2>
        <p>Зображення покемона:</p>
        <img
          alt={name}
          width={300}
          src={sprites.other["official-artwork"].front_default}
        />
        <h3>Stats:</h3>
        <ul>
          {stats.map(entry => {
            return (
              <li key={entry.stat.name}>
                {entry.stat.name} : {entry.base_stat}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PokemonDataView;
