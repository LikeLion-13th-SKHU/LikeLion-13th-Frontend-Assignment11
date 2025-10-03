import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function DetailPage() {
  const { name } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemonDetail", name],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <ClipLoader size={60} color={"#e60012"} />
      </div>
    );
  }

  if (isError) {
    return <div>포켓몬 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="grid place-items-center min-h-screen font-san">
      <div className="border-4 border-red-600 rounded-3xl w-[480px] shadow-gray-300 shadow-lg">
        <div className="border-4 border-black w-45 h-45 bg-[#f9f9f9] rounded-full grid place-items-center mx-auto mt-10 mb-4">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>

        <h1 className="text-center text-4xl uppercase mb-1.5">
          {pokemon.name}
        </h1>

        <div className="flex justify-center gap-1 mb-4">
          {pokemon.types.map((t) => (
            <span
              className="border rounded-full bg-black text-white py-1.5 text-sm px-3"
              key={t.type.name}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <ul className="border-t-2 border-red-500 mx-10 mb-15">
          {pokemon.stats.map((stat) => (
            <li
              className="border-b-2 border-red-500 flex justify-between items-center py-1"
              key={stat.stat.name}
            >
              <span>{stat.stat.name.toUpperCase()}</span>
              <span>{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetailPage;
