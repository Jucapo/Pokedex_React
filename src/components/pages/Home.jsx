import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import "../../styles/_styles.css";

import homeIcon from "../../assets/home.png";
import catchIcon from "../../assets/catch.png";
import detailIcon from "../../assets/details.png";

const Home = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  const { state, addCatches } = useContext(AppContext);

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  const getPokemon = async () => {
    const pokemonInfo = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      pokemonInfo.push(res.data);
      setPokemonData(pokemonInfo);
      console.log(pokemonData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="homeContainer">
      <div className="searchContainer">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" onChange={handleChange} placeholder="enter pokemon name" />
            </label>
          </form>
        </div>
        <img className="homeIcon" src={homeIcon} alt="home" />
      </div>
      <div className="detailContainer">
        <div className="listContainer">
          {state.allPokemon.map((pokemon) => {
            return <div className="listItem">{pokemon.name} </div>;
          })}
        </div>
        <div className="cardContainer">
          {pokemonData.map((data) => {
            return (
              <div className="cardBodyContainer">
                <div className="leftColumnCard">
                  <div className="pokemonName">{data.name}</div>
                  <img className="pokemonImg" src={data.sprites["front_default"]} />
                </div>
                <div className="rigthColumnCard">
                  <img className="catchIcon" src={catchIcon} alt="catch" />
                  <img className="detailsIcon" src={detailIcon} alt="datails" />
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
