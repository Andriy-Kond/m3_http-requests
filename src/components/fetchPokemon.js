async function fetchPokemon(name, url) {
  const res = await fetch(`${url}/${name}`);
  if (res.ok) {
    return res.json();
  }

  return await Promise.reject(
    new Error(`Покемона з ім'ям ${name} не знайдено`),
  );
}

export { fetchPokemon };
