import React, { useState } from 'react';
import { courts } from '../Components/courtsData';
import Header from '../Components/Header';
import '../Pages Styles/HomePage1.css';
import { Link } from 'react-router-dom';


function HomePage1() {
    const [selectedLocation, setSelectedLocation] = useState("");

    // Function to handle the location change
    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    // Filter courts based on the selected location
    const filteredCourts = selectedLocation
        ? courts.filter(court => court.address === selectedLocation)
        : courts;

    return (
        <div className="App">
            <Header />
            <div className="home-page1">
                <div className="hero">
                    <div className="hero-text">
                        <h1>Forget Busy Work, Start New Game</h1>
                        <p>
                            We provide what you need to enjoy your
                            game with your friends. Time to make another
                            memorable moments.
                        </p>
                    </div>
                    <div className="hero-image">
                        <img src={require('../assets/OIP.jpg')} alt="Game setup" className="hero-main-image" />
                        <img src={require('../assets/OIP (1).jpg')} alt="Game setup" className="hero-main-image" />
                    </div>
                </div>

                <section className="most-picked">
                    <h2>Most Picked</h2>
                    <div className="picked-cards">
                        <div className="card">Padel Shift</div>
                        <div className="card">We Padel</div>
                        <div className="card">Padel X</div>
                        <div className="card">Padel One</div>
                        <div className="card">Rocket Padel</div>
                    </div>
                </section>

                <section className="locations">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ marginRight: '20px' }}>Choose Location:</h2>
                    <select
                        className="location-dropdown"
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        style={{ padding: '10px', borderRadius: '5px', width: '200px' }}
                    >
                        <option value="">Select a Location</option>
                        {["6-october", "zayed", "shobra", "helwan", "giza", "cairo"].map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
                <div className="location-cards">
                    {filteredCourts.map((court) => (
                        <div key={court.__id} className="court-card">
                            <img src={court.photo} alt={court.courtname} className="court-image" />
                            <div className="court-name">{court.courtname}</div>
                            <div className="court-address">{court.address}</div>
                            <div className="court-phone">{court.phone}</div>
                        </div>
                    ))}
                </div>
            </section>

                <footer className="footer">
                    <div className="footer-info">
                        <h3>About Us</h3>
                        <p>
                            Enjoy a new and safe padel tennis experience with PadelBeast.
                            Play. Share. #Smash_it #Win_it
                        </p>
                    </div>
                    <div className="footer-links">
                        <h3>Navigation</h3>
                        <ul>
                        <li>
                            <Link to="/">HOME</Link></li>
                            <li><Link to="/Courts">BOOK A COURT</Link></li>
                            <li><Link to="/ContactUs">CONTACT US</Link></li>
                        </ul>
                    </div>
                    <div className="footer-social">
                        <h3>Follow us on social media</h3>
                        <p>Facebook</p>
                        <p>Instagram</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default HomePage1;
