import { useState, useEffect } from "react";
import initialState from "../initalState";
import axios from "axios";

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getPokemonsList();
  }, []);

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

  const addCatches = (payload) => {
    setState({
      ...state,
      catches: [...state.catches, payload],
    });
  };

  const removeCatches = (payload, indexToRemove) => {
    setState({
      ...state,
      cart: state.catches.filter((payload, currentIndex) => currentIndex !== indexToRemove),
    });
  };

  return {
    addCatches,
    removeCatches,
    state,
  };
};

export default useInitialState;
