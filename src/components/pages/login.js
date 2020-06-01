import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const login = () =>
    <section className="login">
        <h1>Login</h1>
        <div className="loginBody">
          <label className="ID">ID </label><TextField size="small" label="Enter your ID" variant="outlined" /><br />
          <label className="password">Password </label><TextField size="small" label="Enter your Password" variant="outlined" /><br />
        </div>
        <Button variant="contained" size="small" color="primary" >Authorize</Button><br />
        <span id="forgotPassword">Forgot Password</span>
    </section>