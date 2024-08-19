import React, { Component } from "react";
import { toast } from "react-toastify";
import PokemonErrorView from "./PokemonErrorView";
import PokemonDataView from "./PokemonDataView";
import PokemonPendingView from "./PokemonPendingView";
import { fetchPokemon } from "./fetchPokemon";

const URL = "https://pokeapi.co/api/v2/pokemon";

const machineStatus = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: machineStatus.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const nextPokemonName = this.props.pokemonName;
    const prevPokemonName = prevProps.pokemonName;

    if (prevPokemonName !== nextPokemonName) {
      this.setState({ status: machineStatus.PENDING });

      fetchPokemon(nextPokemonName, URL)
        .then(pokemon => {
          this.setState({ pokemon, status: machineStatus.RESOLVED });
          toast.success(`${pokemon.name} was found`);
        })
        .catch(error => {
          this.setState({ error, status: machineStatus.REJECTED });
          toast.error(error.message);
        });
    }
  }

  render() {
    const { error, pokemon, status } = this.state;
    const { pokemonName } = this.props;

    if (status === machineStatus.IDLE) {
      return <div>Введіть ім'я покемона</div>;
    }

    if (status === machineStatus.PENDING) {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }

    if (status === machineStatus.REJECTED) {
      return <PokemonErrorView message={error.message} />;
    }

    if (status === machineStatus.RESOLVED) {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}

export default PokemonInfo;
