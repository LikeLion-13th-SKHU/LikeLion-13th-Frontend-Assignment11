// HomePage.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import PokemonCard from "./PokemonCard";

function HomePage() {
  const [search, setSearch] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { data: pokemonList = [], isLoading, isFetching } = useQuery({
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
    <div className="min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <h1 className="text-4xl font-bold text-black mb-6 font-ram">포켓몬 도감</h1>
        
        <input
          type="text"
          placeholder="포켓몬 이름 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 font-ram focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* 메인 콘텐츠 섹션 */}
      {isLoading || isFetching ? (
        <div className="flex justify-center items-center py-20">
          <ClipLoader size={60} color="#3b4cca" />
        </div>
      ) : (
        <div className="px-8 pb-8">
          <div className="grid grid-cols-8 gap-4 max-w-7xl mx-auto">
            {filtered.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;