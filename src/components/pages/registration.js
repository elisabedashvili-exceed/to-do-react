import React, { Component, createRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export class registration extends Component {
  idField = createRef();
  firstPassField = createRef();
  secondPassField = createRef();

  submit = () => {
    if (
      this.firstPassField.current.value !== this.secondPassField.current.value
    ) {
      alert("Passwords don't match");
    } else if (this.firstPassField.current.value.length < 6) {
      alert("Password: Minimum 6 symbols");
    } else if (!this.idField.current.value.trim()) {
      alert("Please, enter your username");
    } else {
      let userObject = {
        username: this.idField.current.value,
        password: this.firstPassField.current.value,
      };
      axios
        .post("http://localhost:8000/addUser", userObject)
        .then((res) => {
          console.log("Successfully registered", res);
          alert("Successfully registered");
          this.idField.current.value = "";
          this.firstPassField.current.value = "";
          this.secondPassField.current.value = "";
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="login">
        <h1>Registration</h1>
        <div className="registrationBody">
          <label className="ID">ID </label>
          <TextField
            inputRef={this.idField}
            className="regInputField"
            size="small"
            label="Enter your ID"
            variant="outlined"
          />
          <br />
          <label className="password">Password </label>
          <form className="passwords">
            <TextField
              inputRef={this.firstPassField}
              className="regInputField"
              size="small"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <br />
            <label className="password">Repeat Password </label>
            <TextField
              inputRef={this.secondPassField}
              className="regInputField"
              size="small"
              label="Repeat Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <br />
          </form>
        </div>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => this.submit()}
        >
          Submit
        </Button>
      </div>
    );
  }
}
