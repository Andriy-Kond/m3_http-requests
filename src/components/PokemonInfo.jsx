import React, { Component } from "react";
import { toast } from "react-toastify";
import PokemonErrorView from "./PokemonErrorView";
import PokemonDataView from "./PokemonDataView";
import PokemonPendingView from "./PokemonPendingView";
import { fetchPokemon } from "./fetchPokemon";

const URL = "https://pokeapi.co/api/v2/pokemon";

class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const nextPokemonName = this.props.pokemonName;
    const prevPokemonName = prevProps.pokemonName;

    if (prevPokemonName !== nextPokemonName) {
      this.setState({ status: "pending" });

      fetchPokemon(nextPokemonName, URL)
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
    const { error, pokemon, status } = this.state;
    const { pokemonName } = this.props;

    if (status === "idle") {
      return <div>Введіть ім'я покемона</div>;
    }

    if (status === "pending") {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }

    if (status === "rejected") {
      return <PokemonErrorView message={error.message} />;
    }

    if (status === "resolved") {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}

export default PokemonInfo;
