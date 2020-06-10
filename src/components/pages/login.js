import React, { Component, createRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export class login extends Component {
  idField = createRef();
  passField = createRef();

  authorisation = (e) => {
    e.preventDefault();
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
        // COMMENT hash getrequest for pass
        username: idField,
        password: passField,
      };

      axios
        .post("http://localhost:8000/login", {
          body: userObject,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.props.history.push("/");
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Error logging in please try again");
        });
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
          onClick={(e) => this.authorisation(e)}
        >
          Authorize
        </Button>
        <br />
        <span id="forgotPassword">Forgot Password</span>
      </section>
    );
  }
}
