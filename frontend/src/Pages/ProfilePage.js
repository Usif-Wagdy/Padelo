//court page
import React from 'react';  
import { Link } from 'react-router-dom';
import '../Pages Styles/App.css';

function Profile() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Profile</h1>
                <Link to="/HomePage2">HomePage2</Link>
                <Link to="/">HomePage1</Link>
                <Link to="/Courts">Courts</Link>
                <Link to="/ContactUs">ContactUs</Link>
                <Link to="/Register">Register</Link>
                <Link to="/Login">Login</Link>
            </header>
        </div>
    );
}

export default Profile;