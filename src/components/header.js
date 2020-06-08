import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link className="navButton" to="/">
          <Button variant="contained" size="small" color="primary">
            Home
          </Button>
        </Link>
        <Link className="navButton" to="/login">
          <Button variant="contained" size="small" color="primary">
            Login
          </Button>
        </Link>
        <Link className="navButton" to="/registration">
          <Button variant="contained" size="small" color="primary">
            Registration
          </Button>
        </Link>
      </div>
    );
  }
}
