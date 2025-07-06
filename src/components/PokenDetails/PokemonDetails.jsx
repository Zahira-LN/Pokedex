import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({
    name: null,
    image: null,
    height: null,
    weight: null,
    types: null,
  });

  const getPokemonDetail = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log("response", response);

    setPokemon({
      name: response.data.name,
      image: response.data.sprites?.other
        ? response.data.sprites?.other.dream_world?.front_default
        : response.data.sprites?.front_shiny,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types.map((t) => t.type.name),
    });
  };

  useEffect(() => {
    getPokemonDetail();
  });

  console.log("id", id);
  return (
    <div>
      <span>{pokemon.name}</span>
      <img src={pokemon.image} alt="" />
      <span>height: {pokemon.height}</span>
      <span>weight: {pokemon.weight}</span>
      <div>
        {/* {pokemon.types.length>0 && pokemon.types.map((t) => (
          <div key={t.name}>{t.name}</div>
        ))} */}
      </div>
    </div>
  );
};

export default PokemonDetails;
