import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import './Header.css';

const Header = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Track the active link
    const navRef = useRef(null); // Reference to the navigation container
    const backgroundRef = useRef(null); // Reference to the background box
    const location = useLocation(); // Get the current URL location

    // Update activeIndex based on current URL
    useEffect(() => {
        const paths = ['/', '/Courts', '/ContactUs'];
        const currentIndex = paths.indexOf(location.pathname);
        setActiveIndex(currentIndex === -1 ? 0 : currentIndex);
    }, [location]);

    // Function to adjust the background position and size based on active index
    const adjustBackground = () => {
        if (navRef.current && backgroundRef.current) {
            const activeLink = navRef.current.children[activeIndex + 1]; // Account for background box being first child
            if (activeLink) {
                const { offsetLeft, offsetWidth } = activeLink; // Get position and width of active link
                backgroundRef.current.style.transform = `translateX(${offsetLeft}px)`; // Move the background box
                backgroundRef.current.style.width = `${offsetWidth}px`; // Adjust width to match active link
            }
        }
    };

    // Adjust background when activeIndex or window resizes
    useEffect(() => {
        adjustBackground(); // Adjust the background position and size
        window.addEventListener('resize', adjustBackground); // Add resize event listener

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', adjustBackground);
        };
    }, [activeIndex]); // Dependency on activeIndex to adjust when it changes

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
            <nav className="nav" ref={navRef}>
                <div className="nav-background" ref={backgroundRef}></div>
                {['Home', 'Courts', 'Contact Us'].map((link, index) => (
                    <Link
                        to={`/${link.replace(' ', '')}`} 
                        className="nav-link"
                        key={index}
                    >
                        {link}
                    </Link>
                ))}
            </nav>
            <div className="auth-buttons">
                <button className="register">Register</button>
                <button className="login">Login</button>
            </div>
        </header>
    );
};

export default Header;
