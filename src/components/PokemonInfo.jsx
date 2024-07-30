import React, { Component } from "react";

const URL = "https://pokeapi.co/api/v2/pokemon";

class PokemonInfo extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { pokemonName } = this.props;

    if (prevProps.pokemonName !== pokemonName) {
      fetch(`${URL}/${pokemonName}`)
        .then(res => res.json())
        .then(value => {
          console.log("PokemonInfo >> fetch >> value:::", value);
        });
    }
  }

  render() {
    const { pokemonName } = this.props;

    return (
      <div>
        <h1>Pokemon Info</h1>
        <p>{pokemonName}</p>
      </div>
    );
  }
}

export default PokemonInfo;
