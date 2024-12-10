import React, { useState, useEffect } from 'react';
import "../Pages Styles/ProfilePage.css";




const ProfilePage = () => {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    };


    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(personalInfo),
            });
            const data = await response.json();
            console.log('Personal information saved:', data);
            fetchBookingHistory();
        } catch (error) {
            console.error('Error saving personal information:', error);
        }
    };
    
    const fetchBookingHistory = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setBookingHistory(data.slice(0, 3));
        } catch (error) {
            console.error('Error fetching booking history:', error);
        }
    };
    
    useEffect(() => {
        fetchBookingHistory();
    }, []);

    return (
        <div className="profile-page">
            <div className="background-image"></div>
            <div className="profile-container">
                <header className="profile-header">
                    <h1> Welcome Dr algayar </h1>
                </header>

                <section className="booking-history">
                    <h2>Booking History</h2>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Booking No.</th>
                                <th>Date</th>
                                <th>Duration</th>
                                <th>Court</th>
                                <th>Status</th>
                                <th>Rating</th>
                                <th>Add Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingHistory.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.duration}</td>
                                    <td>{booking.court}</td>
                                    <td>{booking.status}</td>
                                    <td>{booking.rating}</td>
                                    <td>
                                        <button className="comment-button">Add Comment</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="account-settings">
                    <h2>Account Settings</h2>
                    <form onSubmit={handlePersonalInfoSubmit}>
                        <div className="personal-info">
                            <h3>Personal Information</h3>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={personalInfo.fullName}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone no."
                                value={personalInfo.phone}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit" className="save-button">Save</button>
                        </div>
                    </form>

                    <div className="password-info">
                            <h3>Password</h3>
                            <input type="password" placeholder="Current Password" required />
                            <input type="password" placeholder="New Password" required />
                            <input type="password" placeholder="Confirm New Password" required />
                            <button type="submit" className="save-button">Submit</button>
                    </div>
                </section>

                <button className="logout-button">Logout</button>
            </div>
        </div>
    );
};

export default ProfilePage;
