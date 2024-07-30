function fetchPokemon(name, url) {
  return fetch(`${url}/${name}`).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Покемона з ім'ям ${name} не знайдено`));
  });
}

export { fetchPokemon };
