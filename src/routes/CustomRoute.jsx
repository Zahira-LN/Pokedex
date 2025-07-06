import React from "react";
import { Route, Routes } from "react-router-dom";
import Pokedex from "../components/pokedex/Pokedex";
import PokemonDetails from "../components/PokenDetails/PokemonDetails";

const CustomRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
};

export default CustomRoute;
