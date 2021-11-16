import React, { useState, useContext, useMemo, Fragment } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";

import "../../styles/_styles.css";

import homeIcon from "../../assets/home.png";
import catchIcon from "../../assets/catch.png";
import detailIcon from "../../assets/details.png";
import closeIcon from "../../assets/close-icon.png";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {
  const { state } = useContext(AppContext);
  const pokemons = state.allPokemon;
  const [pokemonData, setPokemonData] = useState([]);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };

  const modalStyle = {
    backgroundColor: "#f5f5f5",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

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
    <Fragment>
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
          <Modal isOpen={modal} style={modalStyle}>
            <ModalBody>
              <div className="headerPopUp">
                <div className="pokemonNamePopUp">{capitalize(data.name)}</div>
                <img className="closeIcon" src={closeIcon} alt="close" />
              </div>
              <div className="bodyPopUp">
                <img className="pokemonImg" src={data.sprites["front_default"]} alt="pokemon" />
                <div>ATAKCS</div>
              </div>
            </ModalBody>
          </Modal>
        );
      })}
    </Fragment>
  );
};

export default Home;
