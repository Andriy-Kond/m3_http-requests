// endpoint: "https://pokeapi.co/api/v2/pokemon/{id or name}/" (https://pokeapi.co/docs/v2#pokemon)

import { Component } from "react";

const URL = "https://pokeapi.co/api/v2/pokemon";

class App extends Component {
  state = {
    pokemon: null,
    loading: false,
  };

  componentDidMount = () => {
    this.setState({ loading: true });

    fetch(`${URL}/ditto`)
      .then(res => res.json())
      .then(pokemon => {
        this.setState({ pokemon });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { pokemon, loading } = this.state;
    return (
      <div>
        {loading && <p>Завантажую...</p>}
        {pokemon && <div>{pokemon.name}</div>}
      </div>
    );
  }
}

export default App;
