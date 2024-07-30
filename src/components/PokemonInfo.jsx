import React, { Component } from "react";
import { toast } from "react-toastify";

const URL = "https://pokeapi.co/api/v2/pokemon";

class PokemonInfo extends Component {
  state = { pokemon: null, loading: false, error: null };

  componentDidUpdate(prevProps, prevState) {
    const nextPokemonName = this.props.pokemonName;
    const prevPokemonName = prevProps.pokemonName;

    if (prevPokemonName !== nextPokemonName) {
      this.setState({ loading: true, pokemon: null });

      fetch(`${URL}/${nextPokemonName}`)
        .then(res => {
          // Якщо буде будь-яка помилка окрім 404, то вона прокинеться до catch. А 404 маємо обробляти якщо бекенд її нормально не кидає:
          if (res.ok) {
            return res.json(); // якщо все добре, то йдемо далі у then
          }
          // інакше примусово кидаємо помилку у catch за допомогою Promise.reject:
          return Promise.reject(
            new Error(`Покемона з ім'ям ${nextPokemonName} не знайдено`),
          );

          // Якщо використовується async, то так само повертаємо Promise.reject і обертаємо у try-catch (якщо треба).
        })
        .then(pokemon => {
          this.setState({ pokemon });
          toast.success(`${pokemon.name} was found`);
        })
        .catch(error => {
          this.setState({ error });
          toast.error(error.message);
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { loading, error } = this.state;

    const pokemonNameProps = this.props.pokemonName;
    const { pokemon } = this.state;

    return (
      <div>
        <h1>Pokemon Info</h1>

        {error && <p>{error.message}</p>}
        {loading && <p>Завантажую...</p>}
        {!pokemonNameProps && <div>Введіть ім'я покемона</div>}
        {pokemon && (
          <div>
            <p>Ім'я покемона: {pokemon.name}</p>
            <p>Зображення покемона:</p>
            <img
              alt={pokemon.name}
              width={300}
              src={pokemon.sprites.other["official-artwork"].front_default}
            />
          </div>
        )}
      </div>
    );
  }
}

export default PokemonInfo;
