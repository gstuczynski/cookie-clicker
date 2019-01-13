import React, { Component } from "react";
import _ from "underscore";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import "../styles/panteon.css";

const BACKEND_URL = "http://localhost:3001";

class Panteon extends Component {
  constructor() {
    super();
    this.state = {
      scores: []
    };
  }
  componentDidMount() {
    axios.get(`${BACKEND_URL}/panteon`).then(res =>
      this.setState({
        scores: res.data
      })
    );
  }


  render() {
    const data = {
      columns: [
        {
          label: "Nick",
          field: "nick",
          sort: "asc",
          width: 20
        },
        {
          label: "Level",
          field: "level",
          sort: "asc",
          width: 100
        },
        {
          label: "Points",
          field: "points",
          sort: "asc",
          width: 200
        },
        {
          label: "Total speed (p/s)",
          field: "avgPointsGainedOnFinish",
          sort: "asc",
          width: 100
        },
        {
          label: "Best speed (p/s)",
          field: "bestAvgPoinsGainedTime",
          sort: "asc",
          width: 150
        }
      ],
      rows: this.state.scores
    };
    return <MDBDataTable striped bordered hover data={data} />;
  }
}

export default Panteon;
