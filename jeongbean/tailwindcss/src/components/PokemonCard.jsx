import { Link } from "react-router-dom";

function getIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

function PokemonCard({ pokemon }) {
  const id = getIdFromUrl(pokemon.url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="bg-[#f9f9f9] border-2 border-gray-200 rounded-[10px] shadow-gray-200 shadow-md hover:bg-[#ccc7c7]">
      <Link
        to={`/pokemon/${pokemon.name}`}
        className="block text-center py-3 px-4"
      >
        <img src={imageUrl} alt={pokemon.name} className="mx-auto" />
        <div className="capitalize">{pokemon.name}</div>
      </Link>
    </div>
  );
}

export default PokemonCard;
