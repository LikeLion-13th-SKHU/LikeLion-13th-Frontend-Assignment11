// PokemonCard.jsx
import { Link } from "react-router-dom";

function getIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

function PokemonCard({ pokemon }) {
  const id = getIdFromUrl(pokemon.url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="border-1 border-gray-300 rounded-2xl shadow-md shadow-gray-300 flex justify-center w-40 bg-gray-100 m-4">
      <Link to={`/pokemon/${pokemon.name}`}>
        <img src={imageUrl} alt={pokemon.name} />
        <div className="text-center">{pokemon.name}</div>
      </Link>
    </div>
  );
}

export default PokemonCard;
