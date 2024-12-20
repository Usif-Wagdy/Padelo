import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../Styles/adminPage2.css";

const Admin2 = () => {
  const { id } = useParams(); 
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const token = location.state?.token; 

  const [courtDetails, setCourtDetails] = useState(null);
  const [updatedCourt, setUpdatedCourt] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    contactNumber: "",
    email: "",
    image: "",
  });


  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/courts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourtDetails(data.court);
        setUpdatedCourt(data.court); 
      })
      .catch((error) => console.error("Error fetching court:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourt((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCourt = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin/courts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCourt),
      });

      if (response.ok) {
        alert("Court updated successfully!");
        setCourtDetails(updatedCourt);
      } else {
        alert("Failed to update court. Please try again.");
      }
    } catch (error) {
      console.error("Error updating court:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleDeleteCourt = async () => {
    if (window.confirm("Are you sure you want to delete this court?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/admin/courts/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          alert("Court deleted successfully!");
          navigate("/Admin"); 
        } else {
          alert("Failed to delete court. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting court:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (!courtDetails) {
    return <p>Loading court details...</p>;
  }

  return (
    <div className="update-court">
      <h1>Manage Court: {courtDetails.name}</h1>
      <div className="court-info">
        <h2>{courtDetails.name}</h2>
        <p>Location: {courtDetails.location}</p>
        <p>Description: {courtDetails.description}</p>
        <p>Price per hour: {courtDetails.price}</p>
        <p>Contact: {courtDetails.contactNumber}</p>
        <p>Email: {courtDetails.email}</p>
        <img src={courtDetails.image} alt={courtDetails.name} />
      </div>
      <div className="form">
        <h2>Update Court Details</h2>
        <input
          type="text"
          name="name"
          value={updatedCourt.name}
          onChange={handleInputChange}
          placeholder="Court Name"
        />
        <input
          type="text"
          name="description"
          value={updatedCourt.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={updatedCourt.price}
          onChange={handleInputChange}
          placeholder="Price per Hour"
        />
        <input
          type="text"
          name="location"
          value={updatedCourt.location}
          onChange={handleInputChange}
          placeholder="Location"
        />
        <input
          type="tel"
          name="contactNumber"
          value={updatedCourt.contactNumber}
          onChange={handleInputChange}
          placeholder="Contact Number"
        />
        <input
          type="email"
          name="email"
          value={updatedCourt.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="image"
          value={updatedCourt.image}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <button className="update-button" onClick={handleUpdateCourt}>
          Update Court
        </button>
        <button className="delete-button" onClick={handleDeleteCourt}>
          Delete Court
        </button>
      </div>
    </div>
  );
};

export default Admin2;
