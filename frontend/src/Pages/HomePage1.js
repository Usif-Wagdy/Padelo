//home page before login&register

import React from 'react';  
import Header from '../Components/Header';

import { Link } from 'react-router-dom';
import '../Pages Styles/App.css';

function HomePage1() {
    return (
        <div className="App">
            <header className="App-header">
            <Header />
                <h1>Home Page1</h1>
                <Link to="/HomePage2">HomePage2</Link>
                <Link to="/Courts">Courts</Link>
                <Link to="/Profile">Profile</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
                <Link to="/ContactUs">ContactUs</Link>
            </header>
        </div>
    );
}

export default HomePage1;