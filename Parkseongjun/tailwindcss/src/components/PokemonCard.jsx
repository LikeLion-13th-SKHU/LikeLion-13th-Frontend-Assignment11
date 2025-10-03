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
    <Link to={`/pokemon/${pokemon.name}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col items-center">
        <img 
          src={imageUrl} 
          alt={pokemon.name}
          className="w-16 h-16 mb-2 object-contain"
        />
        <div className="text-sm font-medium text-black font-ram text-center capitalize">
          {pokemon.name}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;