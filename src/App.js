import React, { Component } from "react";
import Cookie from "./components/Cookie";
import Achievements from "./components/Achievements/Achievements";
import Stats from "./components/Stats";
import Shop from "./components/Shop/Shop";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="dashboard">
          <Stats />
          <Shop />
          <Achievements />
        </div>
        <div className="cookieWrapper">
          <Cookie />
        </div>
      </div>
    );
  }
}

export default App;
