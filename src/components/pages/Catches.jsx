import React, { useState, useContext, useMemo, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import axios from "axios";

import "../../styles/_styles.css";

import homeIcon from "../../assets/home.png";
import releaseIcon from "../../assets/release.png";
import detailIcon from "../../assets/details.png";
import closeIcon from "../../assets/close-icon.png";

import { Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const Catches = () => {
  const { state } = useContext(AppContext);
  const pokemons = state.catchesPokemon;
  const [pokemonData, setPokemonData] = useState([]);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };

  const modalStyle = {
    backgroundColor: "#000a64",
    maxWidth: "800px",
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const useSearchPokemon = (pokemons) => {
    const [query, setQuery] = useState("");
    const [filteredPokemon, setfilteredPokemon] = useState(pokemons);

    console.log(pokemons);

    useMemo(() => {
      setfilteredPokemon(
        pokemons.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(query.toLowerCase());
        })
      );
    }, [pokemons, query]);
    console.log("filteredPokemon", filteredPokemon);
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
      console.log(pokemonInfo);
    } catch (e) {
      console.log(e);
    }
  };

  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  const { query, setQuery, filteredPokemon } = useSearchPokemon(pokemons);
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="titleContainer">Pokemon Catches</div>
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
          <img className="homeIcon" onClick={() => navigate("/")} src={homeIcon} alt="home" />
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
                      <img className="releaseIcon" src={releaseIcon} alt="catch" />
                      <h4>RELEASE</h4>
                    </div>
                    <div className="buttonContianer ml1" onClick={() => openModal()}>
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
      {pokemonData.map((data) => {
        return (
          <Modal className="popupDetails" isOpen={modal} style={modalStyle}>
            <ModalBody>
              <div className="headerPopUp">
                <div className="pokemonNamePopUp">{capitalize(data.name)}</div>
                <img className="closeIcon" alt="close" onClick={() => openModal()} src={closeIcon} />
              </div>
              <div className="bodyPopUp">
                <img className="pokemonImgDetail" src={data.sprites["front_default"]} alt="pokemon" />
                <div className="pokemonDetails">
                  <h4>Type: {capitalize(data.types[0].type.name)}</h4>
                  <h4>Height: {Math.round(data.height * 3.9)}"</h4>
                  <h4>Weight: {Math.round(data.weight / 4.3)} lbs</h4>
                  <h4>Abilities: </h4>
                  {data.abilities.map((ability) => {
                    return <li>{ability.ability.name}</li>;
                  })}
                </div>
                <div className="buttonContianer catchDetails">
                  <img className="releaseIcon" src={releaseIcon} alt="catch" />
                  <h4>RELEASE</h4>
                </div>
              </div>
            </ModalBody>
          </Modal>
        );
      })}
    </Fragment>
  );
};

export default Catches;
