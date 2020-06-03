import React from 'react';
import {createRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const idField = createRef();
const firstPassField = createRef();
const secondPassField = createRef();

export const registration = () =>
    <section className="login">
      <h1>Registration</h1>
      <div className="registrationBody">
        <label className="ID">ID </label>
        <TextField 
          inputRef={idField}
          className="regInputField"
          size="small" 
          label="Enter your ID" 
          variant="outlined" /><br />
        <label className="password">Password </label>
        <form className="passwords">
        <TextField
          inputRef={firstPassField}
          className="regInputField"
          size="small"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        /><br />
        <label className="password">Repeat Password </label>
        <TextField
          inputRef={secondPassField}
          className="regInputField"
          size="small"
          label="Repeat Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        /><br />
        </form>
      </div>
        <Button variant="contained" size="large" color="primary" onClick={()=> submit()}>Submit</Button>
    </section>

const submit = () => {
  if (firstPassField.current.value !== secondPassField.current.value) {
    alert("Passwords don't match");
  } else if (firstPassField.current.value.length < 6) {
      alert("Minimum 6 symbols");
  } else {
    let userObject = {
      "username": idField.current.value,
      "password": firstPassField.current.value
    }
    axios.post('http://localhost:3000/addUser', userObject)
    .then(res => {
      console.log("Successfully registered", res);
      alert("Successfully registered");
      idField.current.value = '';
      firstPassField.current.value = '';
      secondPassField.current.value = '';
    }) 
    .catch(err => console.log(err))
  }
}