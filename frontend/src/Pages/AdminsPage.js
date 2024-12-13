import React, { useState } from "react";
import { courts } from "../Components/courtsData";
import "../Pages Styles/AdminPage.css";
import Header3 from "../Components/HeaderAdminPage";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("add");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedLocation(searchTerm); 
  };

  const handleSearchClick = () => {
    setSelectedLocation(searchTerm); 
  };

  const filteredCourts = selectedLocation
  ? courts.filter((court) =>
      court.courtname.toLowerCase().includes(selectedLocation.toLowerCase()) ||
      court.address.toLowerCase().includes(selectedLocation.toLowerCase())
    )
  : courts;


  return (
    <body className="admin-page">
    <div className="admin-container">
        <Header3 />
      <h1 className="admin-header">.</h1>
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
          <h2>Search for delete or update court</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Court, Location"
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearchClick}>
              Search
            </button>
          </div>
          <div className="courts-grid">
            {filteredCourts.map((court) => (
              <div key={court.__id} className="court-card">
                <img
                  src={court.photo}
                  alt={court.courtname}
                  className="court-image"
                />
                <div className="court-details">
                  <p className="court-name">{court.courtname}</p>
                  <p className="court-address">{court.address}</p>
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
          <form className="add-form">
            <input type="text" placeholder="Enter Court Name" />
            <input type="text" placeholder="Phone Number" />
            <button type="button" className="upload-button">
              Upload Court Images
            </button>
            <button type="button" className="upload-button">
              Choose Court Location
            </button>
            <button type="submit" className="add-court-button">
              Add
            </button>
          </form>
        </div>
      )}
    </div>
    </body>
  );
};

export default AdminPage;
