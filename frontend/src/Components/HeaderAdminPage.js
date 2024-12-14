import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Header.css';

const Header3 = () => {

    return (
        <header className="header">
            <div className="logo">
                <img
                    src={require('../assets/Logo.png')}
                    alt="Logo"
                    className="logo-image"
                />
                Padelo.
            </div>
            <div className="auth-buttons" style={{ color: "#08260F",fontSize: "30px" }}>
                    Hi Admin          
            </div>
        </header>
    );
};

export default Header3;
