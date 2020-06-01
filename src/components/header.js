import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () =>  
    <div>
        <Link to="/">Home</Link><span> </span>
        <Link to="/login">Login</Link><span> </span>
        <Link to="/registration">Registration</Link>
    </div>
    