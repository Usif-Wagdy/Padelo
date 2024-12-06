//Countact us page

import React from 'react';  
import { Link } from 'react-router-dom';
import '../Pages Styles/App.css';

function CountactUs() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Countact Us</h1>
                <Link to="/">HomePage1</Link>
                <Link to="/HomePage2">HomePage2</Link>
                <Link to="/Courts">Courts</Link>
                <Link to="/Profile">Profile</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
            </header>
        </div>
    );
}

export default CountactUs;