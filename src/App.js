import React from "react";
import Cookie from "./components/Cookie";
import Achievements from "./components/Achievements/Achievements";
import Stats from "./components/Stats";
import Shop from "./components/Shop/Shop";
import Panteon from "./components/Panteon";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

const App = () => (
  <div className="app">
    <div className="dashboard">
      <Stats />
      <Shop />
      <Achievements />
    </div>
    <div className="gameboard">
      <Cookie />
      <Panteon />
    </div>
  </div>
);

export default App;
