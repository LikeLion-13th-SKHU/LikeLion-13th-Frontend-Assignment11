import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import PokemonCard from "./PokemonCard";

function HomePage() {
  const [search, setSearch] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const {
    data: pokemonList = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/pokemon?limit=151`);
      return response.data.results;
    },
  });

  const filtered = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-san">
      <h1 className="text-center text-[40px] font-extrabold mt-10 mb-4">
        포켓몬 도감
      </h1>

      <input
        type="text"
        placeholder="포켓몬 이름 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block mx-auto border-2 border-gray-300 rounded-[7px] p-[6px] w-67 pl-3 mb-15 text-md"
      />

      {isLoading || isFetching ? (
        <div>
          <ClipLoader size={60} color="#3b4cca" />
        </div>
      ) : (
        <ul className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 px-30">
          {filtered.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
