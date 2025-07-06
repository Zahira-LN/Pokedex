import React from "react";
import { Link } from "react-router-dom";

const Pokemon = ({ pokedex, id }) => {
  return (
    <>
      <Link to={`/pokemon/${id}`}>
        <div className="w-[150px] border border-[#ccc]  rounded-b-md p-[10px] h-[100px] flex justify-center flex-col items-center  hover:bg-blue-50 hover:cursor-pointer">
          <div className="font-semibold text-[12px]">
            {pokedex.name.toUpperCase()}
          </div>

          <img src={pokedex.image} alt="" className="h-[100%]" />
        </div>
      </Link>
    </>
  );
};

export default Pokemon;
