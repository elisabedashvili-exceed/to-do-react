import React, { Component, createRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import axios from "axios";

import { login } from "../../redux/actions/logIn-logOut";
import { snackbar } from "../../redux/actions/snackbar";

class Login extends Component {
  idField = createRef();
  passField = createRef();

  authorisation = (e) => {
    const { login, snackbar } = this.props.actions;
    e.preventDefault();
    let idField = this.idField.current.value;
    let passField = this.passField.current.value;

    if (!idField.trim() && !passField.trim()) {
      snackbar(true, "Please, enter username and password.");
    } else if (!passField.trim()) {
      this.setState({ open: true, message: "Please, enter password." });
    } else if (!idField.trim()) {
      this.setState({ open: true, message: "Please, enter username." });
    } else {
      let userObject = {
        // COMMENT hash getrequest for pass
        username: idField,
        password: passField,
      };

      axios
        .post("http://localhost:8000/login", userObject)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.props.history.push("/");
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .then(() => {
          login();
        })
        .catch((err) => {
          console.error(err);
          this.setState({ message: "Error logging in please try again." });
        });
    }
  };

  render() {
    const { snackbar, snackbarMessage } = this.props;
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
          onClick={(e) => {
            this.authorisation(e);
            setTimeout(() => {
              this.props.actions.snackbar(false, null);
            }, 2000);
          }}
        >
          Authorize
        </Button>
        <br />
        <span id="forgotPassword">Forgot Password</span>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackbar}
          message={snackbarMessage}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    snackbar: state.snackbar,
    snackbarMessage: state.snackbarMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        login,
        snackbar
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
