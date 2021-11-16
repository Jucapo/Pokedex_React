import React, { useState, useContext, useMemo } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import "../../styles/_styles.css";

import homeIcon from "../../assets/home.png";
import catchIcon from "../../assets/catch.png";
import detailIcon from "../../assets/details.png";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const { state, setState } = useContext(AppContext);
  const pokemons = state.allPokemon;

  const useSearchPokemon = (pokemons) => {
    const [query, setQuery] = useState("");
    const [filteredPokemon, setfilteredPokemon] = useState(pokemons);

    useMemo(() => {
      setfilteredPokemon(
        pokemons.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(query.toLowerCase());
        })
      );
    }, [pokemons, query]);

    return { query, setQuery, filteredPokemon };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  const getPokemon = async (pokemonName) => {
    const pokemonInfo = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName || query}`;
      const res = await axios.get(url);
      pokemonInfo.push(res.data);
      setPokemonData(pokemonInfo);
    } catch (e) {
      console.log(e);
    }
  };

  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  const { query, setQuery, filteredPokemon } = useSearchPokemon(pokemons);

  return (
    <div className="homeContainer">
      <div className="searchContainer">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Enter Pokemon Name"
              />
            </label>
          </form>
        </div>
        <img className="homeIcon" src={homeIcon} alt="home" />
      </div>
      <div className="detailContainer">
        <div className="listContainer">
          {filteredPokemon.map((pokemon) => {
            return (
              <div key={pokemon.name} className="listItem" onClick={getPokemon.bind(this, pokemon.name)}>
                {capitalize(pokemon.name)}
              </div>
            );
          })}
        </div>
        <div className="cardContainer">
          {pokemonData.map((data) => {
            return (
              <div className="cardBodyContainer">
                <div className="leftColumnCard">
                  <div className="pokemonName">{capitalize(data.name)}</div>
                  <img className="pokemonImg" src={data.sprites["front_default"]} alt="pokemon" />
                </div>
                <div className="rigthColumnCard">
                  <div className="buttonContianer">
                    <img className="catchIcon" src={catchIcon} alt="catch" />
                    <h4>CATCH</h4>
                  </div>
                  <div className="buttonContianer ml1">
                    <img className="detailsIcon" src={detailIcon} alt="datails" />
                    <h4>DETAIL</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
