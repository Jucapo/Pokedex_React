import { useState, useEffect } from "react";
import initialState from "../initalState";
import axios from "axios";

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getPokemonsList();
    console.log(state.allPokemon);
  }, []);

  const getPokemonsList = async () => {
    const pokemonListArray = [];
    try {
      const limit = 150;
      const offset = 0;
      const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
      const res = await axios.get(url);
      pokemonListArray.push(res.data.results);
      setState({
        ...state,
        allPokemon: [...state.allPokemon, ...pokemonListArray],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addCatches = (payload) => {
    setState({
      ...state,
      cart: [...state.cart, payload],
    });
  };

  const removeCatches = (payload, indexToRemove) => {
    setState({
      ...state,
      cart: state.cart.filter((item, currentIndex) => currentIndex !== indexToRemove),
    });
  };

  return {
    addCatches,
    removeCatches,
    state,
  };
};

export default useInitialState;
