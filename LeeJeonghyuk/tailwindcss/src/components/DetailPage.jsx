// DetailPage.jsx
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
    <div className="grid justify-center min-w-screen mt-30">
      <div className="border-3 border-red-600 rounded-2xl w-fit py-10 shadow-2xl text-center">
        <div className="border-3 border-black rounded-[100px] w-fit p-8 bg-gray-100 m-auto">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>

        <h1 className="font-bold uppercase text-2xl px-40 mt-4 font-rf">
          {pokemon.name}
        </h1>

        <div className="flex gap-2 justify-center my-3">
          {pokemon.types.map((t) => (
            <span
              className="border-0 rounded-2xl bg-black text-white text-xs min-w-fit px-2.5 py-1 font-rf"
              key={t.type.name}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <ul className="border-t-2 border-red-500 mx-10">
          {pokemon.stats.map((stat) => (
            <li
              className="flex border-b-1 border-red-400 py-1 justify-between font-rf"
              key={stat.stat.name}
            >
              <span className="font-medium">
                {stat.stat.name.toUpperCase()}
              </span>
              <span className="font-medium">{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetailPage;
