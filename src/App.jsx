// endpoint: "https://pokeapi.co/api/v2/pokemon/{id or name}/" (https://pokeapi.co/docs/v2#pokemon)

import PokemonForm from "components/PokemonForm";
import PokemonInfo from "components/PokemonInfo";
import { Component } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

const URL = "https://pokeapi.co/api/v2/pokemon";

class App extends Component {
  state = { pokemonName: "" };

  handleFormSubmit = pokemonName => {
    this.setState({ pokemonName });
    toast.success(`${pokemonName} was found`);
  };

  render() {
    const { pokemonName } = this.state;
    return (
      <div>
        <ToastContainer autoClose={2000} transition={Slide} />
        <PokemonForm onSubmit={this.handleFormSubmit} />
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    );
  }
}

export default App;
