import React, { Component } from "react";
import { TfiSearch } from "react-icons/tfi";

import { Notify } from "notiflix/build/notiflix-notify-aio";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Notify.init({
  closeButton: true,
  // clickToClose: true,
  cssAnimationStyle: "from-right",
});

class PokemonForm extends Component {
  state = { pokemonName: "" };

  handleSubmit = e => {
    e.preventDefault();
    // console.log("e.elements :>> ", e.currentTarget.elements.pokemonName.value);

    if (!this.state.pokemonName.trim()) {
      // Notify.warning("Enter some pokemon name!");
      toast.info("Enter some pokemon name!");
      return;
    }

    this.props.onSubmit(this.state.pokemonName.trim());
    this.setState({ pokemonName: "" });
  };

  handleNameChange = e => {
    this.setState({ pokemonName: e.target.value.toLowerCase() });
  };

  render() {
    const { pokemonName } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="pokemonName"
          value={pokemonName}
          onChange={this.handleNameChange}
        />
        <button
          type="submit"
          // disabled={!pokemonName.trim()}
          style={{ padding: 5, marginLeft: 8 }}>
          <TfiSearch style={{ marginRight: 8 }} />
          Пошук
        </button>
      </form>
    );
  }
}

export default PokemonForm;
