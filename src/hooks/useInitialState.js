import { useState, useEffect } from "react";
import initialState from "../initalState";
import axios from "axios";

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const getPokemonsList = async () => {
      try {
        const limit = 150;
        const offset = 0;
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
        const res = await axios.get(url);
        setState({
          ...state,
          allPokemon: res.data.results,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getPokemonsList();
  }, []);

  const addCatches = (payload) => {
    setState({
      ...state,
      catchesPokemon: [...state.catchesPokemon, payload],
    });
  };

  const removeCatches = (payload) => {
    setState({
      ...state,
      catchesPokemon: state.catchesPokemon.filter((pokemon) => pokemon.name  !== payload.name),
    });
  };

  return {
    addCatches,
    removeCatches,
    state,
  };
};

export default useInitialState;
