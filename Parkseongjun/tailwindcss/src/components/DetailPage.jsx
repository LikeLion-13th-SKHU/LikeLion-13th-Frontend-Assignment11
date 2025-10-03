// DetailPage.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function DetailPage() {
  const { name } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ["pokemonDetail", name],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <ClipLoader size={60} color={"#e60012"} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-ram">포켓몬 정보를 불러오는 데 실패했습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-red-500 rounded-lg p-8 w-full max-w-md">
        {/* 이미지 섹션 */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-white border-2 border-black rounded-full flex items-center justify-center">
            <img 
              src={pokemon.sprites.front_default} 
              alt={pokemon.name}
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        {/* 이름 섹션 */}
        <h1 className="text-2xl font-bold text-black text-center mb-4 font-ram uppercase">
          {pokemon.name}
        </h1>

        {/* 타입 태그 섹션 */}
        <div className="flex justify-center gap-2 mb-6">
          {pokemon.types.map((t) => (
            <span 
              key={t.type.name}
              className={`px-3 py-1 rounded-full text-white text-sm font-ram ${
                t.type.name === 'grass' ? 'bg-green-700' :
                t.type.name === 'poison' ? 'bg-purple-700' :
                t.type.name === 'fire' ? 'bg-red-600' :
                t.type.name === 'water' ? 'bg-blue-600' :
                t.type.name === 'electric' ? 'bg-yellow-500' :
                t.type.name === 'flying' ? 'bg-indigo-400' :
                t.type.name === 'bug' ? 'bg-green-600' :
                t.type.name === 'normal' ? 'bg-gray-500' :
                'bg-gray-600'
              }`}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* 스탯 섹션 */}
        <div className="space-y-2">
          {pokemon.stats.map((stat, index) => (
            <div 
              key={stat.stat.name}
              className={`flex justify-between items-center py-2 ${
                index !== pokemon.stats.length - 1 ? 'border-b border-red-500' : ''
              }`}
            >
              <span className="text-black font-ram uppercase">
                {stat.stat.name.replace('-', ' ')}
              </span>
              <span className="text-black font-ram font-bold">
                {stat.base_stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;