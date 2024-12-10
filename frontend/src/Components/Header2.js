import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import './Header.css';

const Header2 = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navRef = useRef(null);
    const backgroundRef = useRef(null); 
    const location = useLocation(); 

    useEffect(() => {
        const paths = ['/Home', '/Courts', '/ContactUs', '/Profile'];
        const currentIndex = paths.indexOf(location.pathname);
        setActiveIndex(currentIndex === -1 ? 0 : currentIndex);
    }, [location]);

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
                {['Home', 'Courts', 'Contact Us',"Profile"].map((link, index) => (
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

</div>

        </header>
    );
};

export default Header2;
