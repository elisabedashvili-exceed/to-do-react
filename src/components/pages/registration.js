import React from 'react';
import {createRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const firstPassField = createRef();
const secondPassField = createRef();

export const registration = () =>
    <section className="login">
      <h1>Registration</h1>
      <div className="registrationBody">
        <label className="ID">ID </label>
        <TextField 
          className="regInputField"
          size="small" 
          label="Enter your ID" 
          variant="outlined" /><br />
        <label className="password">Password </label>
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
      </div>
        <Button variant="contained" size="large" color="primary" onClick={()=> submit()}>Submit</Button>
    </section>

const submit = () => {
  if (firstPassField.current.value !== secondPassField.current.value) alert("Passwords don't match");
  if (firstPassField.current.value.length < 6) alert("Minimum 6 symbols");
}