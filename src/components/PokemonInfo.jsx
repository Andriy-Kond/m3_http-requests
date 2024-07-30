import React, { Component } from "react";
import { toast } from "react-toastify";

const URL = "https://pokeapi.co/api/v2/pokemon";

class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: "idle",
    // machine states:
    // idle
    // pending
    // rejected
    // resolved
  };

  componentDidUpdate(prevProps, prevState) {
    const nextPokemonName = this.props.pokemonName;
    const prevPokemonName = prevProps.pokemonName;

    if (prevPokemonName !== nextPokemonName) {
      this.setState({ status: "pending" });

      fetch(`${URL}/${nextPokemonName}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`Покемона з ім'ям ${nextPokemonName} не знайдено`),
          );
        })
        .then(pokemon => {
          this.setState({ pokemon, status: "resolved" });
          toast.success(`${pokemon.name} was found`);
        })
        .catch(error => {
          this.setState({ error, status: "rejected" });
          toast.error(error.message);
        });
    }
  }

  render() {
    const { pokemon, error, status } = this.state;

    if (status === "idle") {
      return <div>Введіть ім'я покемона</div>;
    }

    if (status === "pending") {
      return <p>Завантажую...</p>;
    }

    if (status === "rejected") {
      return <p>{error.message}</p>;
    }

    if (status === "resolved") {
      return (
        <div>
          <p>Ім'я покемона: {pokemon.name}</p>
          <p>Зображення покемона:</p>
          <img
            alt={pokemon.name}
            width={300}
            src={pokemon.sprites.other["official-artwork"].front_default}
          />
        </div>
      );
    }
  }
}

export default PokemonInfo;
