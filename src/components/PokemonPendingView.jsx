import React, { Component } from "react";

import PokemonDataView from "./PokemonDataView";
import { Spinner, StyledSpinner } from "./PokemonPendingView.styled";
import pendingImage from "./pending.gif";

class PokemonPendingView extends Component {
  state = {
    name: this.props.pokemonName,
    sprites: {
      other: {
        "official-artwork": {
          front_default: pendingImage,
        },
      },
    },
    stats: [],
  };

  render() {
    return (
      <>
        <StyledSpinner>
          <Spinner size={32} />
          Завантажую...
        </StyledSpinner>

        {/* Skeleton */}
        <PokemonDataView pokemon={this.state} />
      </>
    );
  }
}

export default PokemonPendingView;
