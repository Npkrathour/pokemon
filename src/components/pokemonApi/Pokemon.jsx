import axios from "axios";
import React, { useEffect, useState } from "react";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [allTypes, setAllTypes] = useState([]);
  // Pokemon Api fetching using Axios Api
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        const results = response.data.results;

        const detailedData = await Promise.all(
          results.map(async (poke) => {
            const res = await axios.get(poke.url);
            return {
              id: res.data.id,
              name: res.data.name,
              image: res.data.sprites.front_default,
              types: res.data.types.map((t) => t.type.name),
            };
          })
        );

        // Get unique types
        const typesSet = new Set();
        detailedData.forEach((poke) => {
          poke.types.forEach((type) => typesSet.add(type));
        });
        setAllTypes(["all", ...Array.from(typesSet)]);
        setPokemon(detailedData);

        setPokemon(detailedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch Pokémon data.");
        setLoading(false);
      }
    };

    fetchApi();
  }, []);
  //Used Filetered Method
  const filteredPokemon = pokemon.filter((poke) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      poke.name.toLowerCase().includes(query) ||
      poke.id.toString().includes(query) ||
      poke.types.some((type) => type.toLowerCase().includes(query));

    const matchesType =
      selectedType === "all" || poke.types.includes(selectedType);

    return matchesSearch && matchesType;
  });
  // prevent default form
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full p-4">
      <div className="md:px-10 px-2">
        <h1 className="text-2xl font-bold mb-4">Pokemon API</h1>
        <div className="w-full mb-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full"
          >
            <input
              type="search"
              placeholder="Search by name, ID, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:flex-1 p-3 font-inter text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full max-w-xs p-3 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              {allTypes.map((type) => (
                <option className="text-sm font-normal" key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </form>
        </div>
        {/* Loading Message  */}
        {loading && (
          <div className="text-center text-2xl absolute w-full h-screen top-0 left-0 right-0  bg-zinc-500 flex items-center justify-center">
            <p className="text-5xl font-semibold text-white">Loading...</p>
          </div>
        )}
        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && filteredPokemon.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No Pokémon found.</p>
        )}
        {/* Grid System, map filtered pokemon api */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPokemon.map((poke) => (
            <div
              key={poke.id}
              onClick={() => handleCardClick(poke)}
              className="text-center border p-4 rounded-lg shadow-sm border-zinc-400 hover:bg-zinc-100 transition"
            >
              <img
                src={poke.image}
                alt={poke.name}
                className="mx-auto w-20 h-20"
              />
              <p className="capitalize mt-2 font-semibold">{poke.name}</p>
              <p className="text-sm font-normal">ID: {poke.id}</p>
              <p className="text-sm font-normal">
                <span className="font-medium">Type</span>:{" "}
                {poke.types.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
