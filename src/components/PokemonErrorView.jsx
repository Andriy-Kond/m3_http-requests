import errorImage from "./error.gif";

export default function PokemonErrorView({ message }) {
  return (
    <div>
      <p>{message}</p>
      <img src={errorImage} alt="error" width={240} />
    </div>
  );
}
