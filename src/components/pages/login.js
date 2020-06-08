import React, { Component, createRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export class login extends Component {
  idField = createRef();
  passField = createRef();

  authorisation = () => {
    let idField = this.idField.current.value;
    let passField = this.passField.current.value;

    if (!idField.trim() && !passField.trim()) {
      alert("please enter username and password");
    } else if (!passField.trim()) {
      alert("please enter password");
    } else if (!idField.trim()) {
      alert("please enter username");
    } else {
      let userObject = {
        username: idField,
        password: passField,
      };

      axios
        .post("http://localhost:3000/login", userObject)
        .then((res) => {
          if (res.data === "Incorrect password") {
            alert("Incorrect password");
          } else if (res.data === "No Users Found") {
            alert("No Users Found");
          } else {
            alert("Successfully Logged In");
          }

          idField = "";
          passField = "";
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <section className="login">
        <h1>Login</h1>
        <div className="loginBody">
          <label className="ID">ID </label>
          <TextField
            inputRef={this.idField}
            size="small"
            label="Enter your ID"
            variant="outlined"
          />
          <br />
          <label className="password">Password </label>
          <TextField
            inputRef={this.passField}
            size="small"
            type="password"
            label="Enter your Password"
            variant="outlined"
          />
          <br />
        </div>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => this.authorisation()}
        >
          Authorize
        </Button>
        <br />
        <span id="forgotPassword">Forgot Password</span>
      </section>
    );
  }
}
