import axios from "axios";
import { useEffect, useState } from "react";
import Search from "../search/Search";
import "./Pokedex.css";
import Pokemon from "./Pokemon";

const Pokedex = () => {
  const [pokedexData, setPokedexData] = useState([]);
  const [pagination, setPagination] = useState({
    previous: null,
    next: null,
  });

  let [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const fetchData = async () => {
    setPagination([]);
    const res = await axios.get(url);
    console.log("result", res);
    const pokedexAll = res.data.results;
    setPagination({
      previous: res.data.previous,
      next: res.data.next,
    });
console.log("pokedexAll",pokedexAll)

    const PokenResutPromise = pokedexAll.map((pokedex) =>
      axios.get(pokedex.url)
    );

    console.log("PokenResutPromise", PokenResutPromise);

    const pokemonData = await axios.all(PokenResutPromise);
    console.log("pokemonData",pokemonData);

    const customize_pokemon = pokemonData.map((pokemon) => {
      const data = pokemon.data;

      return {
        id:data.id,
        name: data.name,
        image: data.sprites?.other
          ? data.sprites?.other.dream_world?.front_default
          : data.sprites?.front_shiny,
        types: data.types,
      };
    });

    setPokedexData(customize_pokemon);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div className="pokedex_wrapper">
      <h1>Enter the Pokedex</h1>
      <Search />

      <div className="ml-auto p-[10px] flex gap-1 justify-center">
        <button
          className={`text-white text-[12px] font-semibold border-none rounded bg-amber-700  p-1
  ${
    pagination.previous == null
      ? "bg-amber-200 cursor-not-allowed opacity-50"
      : "cursor-pointer"
  }`}
          onClick={() => setUrl(pagination.previous)}
          disabled={pagination.previous == null}
        >
          Previous
        </button>
        <button
          className={`text-white text-[12px] font-semibold border-none rounded bg-amber-700  p-1
  ${
    pagination.next == null
      ? "bg-amber-200 cursor-not-allowed opacity-50"
      : "cursor-pointer"
  }`}
          onClick={() => setUrl(pagination.next)}
          disabled={pagination.next == null}
        >
          Next
        </button>
      </div>
      {pokedexData.length > 0 ? (
        <div className="flex gap-2 flex-wrap justify-center items-center mt-2 md:w-[70%] m-auto">
          {pokedexData.map((pokedex) => {
            return (
              <div key={pokedex.count}>
                <Pokemon pokedex={pokedex} id={pokedex.id}/>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading......</div>
      )}
    </div>
  );
};

export default Pokedex;
