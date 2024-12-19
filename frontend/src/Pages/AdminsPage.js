import React, { useState, useEffect } from "react";
import "../Styles/AdminPage.css";
import Header3 from "../Components/HeaderAdminPage";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";


const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("add");
  const [search, setSearch] = useState("");
  const [courts, setCourts] = useState([]);
  const [newCourt, setNewCourt] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    email: "",
    contactNumber: "",
    
    image: "",
  });
  const cookie = new Cookies();
  

  // Fetch courts from the backend
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/courts")
      .then((response) => response.json())
      .then((data) => {
        setCourts(data.courts);
      })
      .catch((error) => console.error("Error fetching courts:", error));
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourt((prevState) => ({
      ...prevState,
      [name]: value, 
    }));
  };
  

  const handleAddCourt = async (e) => {
    e.preventDefault();
    console.log("Adding court: Payload", newCourt);
  
    const token = cookie.get("JWT");
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/admin/courts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCourt),
      });
  
      const responseBody = await response.json();
      console.log("Backend response:", responseBody);
  
      if (response.ok) {
        setCourts((prevCourts) => [...prevCourts, responseBody]);
        alert("Court added successfully!");
        setNewCourt({
          name: "",
          description: "",
          price: "",
          location: "",
          email: "",
          contactNumber: "",
          image: "",
        });
      } else {
        alert(`Failed to add court: ${responseBody.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding court:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  
  
  const filteredCourts = search
    ? courts.filter((court) => {
        const query = search.toLowerCase().trim();
        return (
          court.name.toLowerCase().includes(query) ||
          court.location.toLowerCase().includes(query)
        );
      })
    : courts;

  return (
    <body className="admin-page">
      <div className="admin-container">
        <Header3 />
        <h1 className="admin-header">Admin Panel</h1>
        <div className="buttons-container">
          <button
            className={`toggle-button ${
              activeSection === "update" ? "active" : ""
            }`}
            onClick={() => handleSectionChange("update")}
          >
            Delete & Update
          </button>
          <button
            className={`toggle-button ${
              activeSection === "add" ? "active" : ""
            }`}
            onClick={() => handleSectionChange("add")}
          >
            Add
          </button>
        </div>
        {activeSection === "update" && (
          <div className="update-section">
            <h2>Search for Delete or Update Court</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by Court Name or Location"
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="search-button" onClick={() => setSearch("")}>
                Clear
              </button>
            </div>
            <div className="courts-grid">
              {filteredCourts.map((court) => (
                <div key={court.__id} className="admin-court-card">
                  <Link to={`/Admin2`}>
                    <img
                      src={court.image}
                      alt={court.name}
                      className="court-image"
                    />
                  </Link>
                  <div className="court-details">
                    <p className="court-name">{court.name}</p>
                    <p className="court-address">{court.location}</p>
                    <p className="court-phone">{court.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeSection === "add" && (
          <div className="add-section">
            <h2>ADD COURT</h2>
            <form className="add-form" onSubmit={handleAddCourt}>
              <input
                type="text"
                name="name"
                placeholder="Enter Court Name"
                value={newCourt.name}
                onChange={handleInputChange}
                required
              />
               <input
                type="number"
                name="price"
                placeholder="Enter Court Price per hour"
                value={newCourt.price}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Enter Court email"
                value={newCourt.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Enter Court description"
                value={newCourt.description}
                onChange={handleInputChange}
                
              />
                <input
                type="tel"
                name="contactNumber"
                placeholder="Phone Number"
                value={newCourt.contactNumber}
                onChange={handleInputChange} 
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Court Location"
                value={newCourt.location}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL (or upload below)"
                value={newCourt.image}
                onChange={handleInputChange}
              />
              <label className="upload-label">
                Upload Court Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setNewCourt({ ...newCourt, image: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <button type="submit" className="add-court-button">
                Add Court
              </button>
            </form>
          </div>
        )}
      </div>
    </body>
  );
};

export default AdminPage;
