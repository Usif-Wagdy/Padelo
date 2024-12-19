// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../Styles/adminPage2.css";

// const Admin2 = () => {
//   const { id } = useParams(); // Get court ID from URL
//   const navigate = useNavigate(); // For navigation after delete
//   const [court, setCourt] = useState(null);
//   const [updatedCourt, setUpdatedCourt] = useState({
//     name: "",
//     description: "",
//     price: "",
//     location: "",
//     email: "",
//     contactNumber: "",
//     image: "",
//   });

//   // Fetch court details by ID
//   useEffect(() => {
//     fetch(`http://127.0.0.1:3000/api/courts/${id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setCourt(data.court);
//         setUpdatedCourt(data.court); // Populate form with current court details
//       })
//       .catch((error) => console.error("Error fetching court:", error));
//   }, [id]);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedCourt((prev) => ({ ...prev, [name]: value }));
//   };

//   // Update court
//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/admin/courts/${id}`, {
//         method: "put",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedCourt),
//       });
//       if (response.ok) {
//         alert("Court updated successfully!");
//         const updatedData = await response.json();
//         setCourt(updatedData.court);
//       } else {
//         alert("Failed to update court. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating court:", error);
//     }
//   };

//   // Delete court
//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this court? This action cannot be undone."
//     );
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`http://127.0.0.1:3000/admin/courts/${id}`, {
//           method: "DELETE",
//         });
//         if (response.ok) {
//           alert("Court deleted successfully!");
//           navigate("/admin"); 
//         } else {
//           alert("Failed to delete court. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error deleting court:", error);
//       }
//     }
//   };

//   if (!court) {
//     return <p>Loading court details...</p>;
//   }

//   return (
//     <div className="admin2-container">
//       <h1>Manage Court</h1>
//       <div className="court-details">
//         <h2>Court Information</h2>
//         <p><strong>Name:</strong> {court.name}</p>
//         <p><strong>Location:</strong> {court.location}</p>
//         <p><strong>Price:</strong> ${court.price} per hour</p>
//         <p><strong>Email:</strong> {court.email}</p>
//         <p><strong>Contact Number:</strong> {court.contactNumber}</p>
//         <img src={court.image} alt={court.name} style={{ maxWidth: "300px" }} />
//       </div>
//       <div className="update-court">
//         <h2>Update Court</h2>
//         <form>
//           <input
//             type="text"
//             name="name"
//             placeholder="Court Name"
//             value={updatedCourt.name}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={updatedCourt.location}
//             onChange={handleInputChange}
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Price per hour"
//             value={updatedCourt.price}
//             onChange={handleInputChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={updatedCourt.email}
//             onChange={handleInputChange}
//           />
//           <input
//             type="tel"
//             name="contactNumber"
//             placeholder="Contact Number"
//             value={updatedCourt.contactNumber}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="image"
//             placeholder="Image URL"
//             value={updatedCourt.image}
//             onChange={handleInputChange}
//           />
//         </form>
//         <button onClick={handleUpdate} className="update-button">
//           Update Court
//         </button>
//       </div>
//       <div className="delete-court">
//         <h2>Delete Court</h2>
//         <button onClick={handleDelete} className="delete-button">
//           Delete Court
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Admin2;
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../Styles/adminPage2.css";

const Admin2 = () => {
  const { id } = useParams(); // Get the court ID from the URL
  const location = useLocation(); // Access the state passed via Link
  const navigate = useNavigate(); // For navigation after deletion
  const token = location.state?.token; // Retrieve the token

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

  // Fetch court details
  // Fetch court details by ID
  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/courts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourtDetails(data.court);
        setUpdatedCourt(data.court); // Populate form with current court details
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
        const response = await fetch(`http://localhost:3000/admin/courts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Court deleted successfully!");
          navigate("/Admin"); // Redirect to Admin page after deletion
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
