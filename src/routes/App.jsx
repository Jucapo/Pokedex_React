import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../App.css";

import Home from "../components/pages/Home";
import Catches from "../components/pages/Catches";
import NotFound from "../components/utils/NotFound";
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';


const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/catches" element={<Catches />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
