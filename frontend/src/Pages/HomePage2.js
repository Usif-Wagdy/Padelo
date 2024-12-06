//home page after login&register

import React from 'react';  
import { Link } from 'react-router-dom';
import '../Pages Styles/App.css';

function HomePage2() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Home Page2</h1>
                <Link to="/">HomePage1</Link>
                <Link to="/Courts">Courts</Link>
                <Link to="/ContactUs">ContactUs</Link>
                <Link to="/Profile">Profile</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
            </header>
        </div>
    );
}

export default HomePage2;