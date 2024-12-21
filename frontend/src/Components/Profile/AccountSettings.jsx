import React, { useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { use } from "react";
import { User } from "../../Context/UserContext";

const AccountSettings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
  });
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const cookies = new Cookies();
  const token = cookies.get("JWT");
  const data =useContext(User);


  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    if (token && token !== "undefined") {
      // Decode the token
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    } else {
      setUser({});
    }
  };
  
  const updateName = async () => {
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }
  
    // Validate new name input
    if (!newName || newName.trim() === "") {
      alert("Please provide a valid name.");
      return;
    }
  
    try {
      const response = await fetch("https://padelo-mohamed-hosams-projects-2e84c2a8.vercel.app/api/users/change-name", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id, name: newName }), // Send the updated name in the body
      });
  
      if (response.ok) {
        alert("Name updated successfully!");
        fetchUserData();
      } else {
        // Log response details for debugging
        const errorMessage = await response.text();
        console.error("Failed response:", errorMessage);
        alert(`Failed to update name: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error updating name:", error);
      alert("An error occurred while updating the name.");
    }
  };
  

  const updateEmail = async () => {
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await fetch("https://padelo-mohamed-hosams-projects-2e84c2a8.vercel.app/api/user/change-email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id,email: newEmail }),
      });

      if (response.ok) {
        alert("Email updated successfully!");
        fetchUserData();
      } else {
        alert("Failed to update email.");
      }
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const updatePhoneNumber = async () => {
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await fetch("https://padelo-mohamed-hosams-projects-2e84c2a8.vercel.app/api/user/add-phone-number", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phoneNumber: newPhoneNumber }),
      });

      if (response.ok) {
        alert("Phone number updated successfully!");
        fetchUserData();
      } else {
        alert("Failed to update phone number.");
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
  };

  // const updateProfilePicture = async () => {

  //   if (!token) {
  //     alert("You are not authorized. Please log in.");
  //     return;
  //   }

  //   if (!profilePicture) {
  //     alert("Please select a new profile picture.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("im", profilePicture);
  //   console.log(formData);

  //   try {
  //     const response = await fetch(`https://padelo-mohamed-hosams-projects-2e84c2a8.vercel.app/api/users/update-image/${user.id}`, {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: formData,
  //     });
        
  //     if (response.ok) {
  //       alert("Profile picture updated successfully!");
  //       fetchUserData();
  //     } else {
  //       alert("Failed to update profile picture.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile picture:", error);
  //   }
  // };
const updateProfilePicture = async () => {
  const token = cookies.get("JWT");
  if (!token) {
    alert("You are not authorized. Please log in.");
    return;
  }

  const formData = new FormData();
  formData.append("photo", profilePicture);  // 'photo' matches the backend field name

  try {
    const response = await fetch(`https://padelo-mohamed-hosams-projects-2e84c2a8.vercel.app/api/users/update-image/${user.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      alert("Profile picture updated successfully!");
      fetchUserData();
    } else {
      alert("Failed to update profile picture.");
    }
  } catch (error) {
    console.error("Error updating profile picture:", error);
  }
};

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>
      <div className="user-info">
        <img
          src={user.image}
          width={10}
          height={100}
          alt="Profile"
          className="profile-picture"
        />
        {console.log(user.image)}
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {user.phoneNumber || "Not Provided"}
        </p>
      </div>
      <div className="edit-section">
        <input
          type="text"
          placeholder="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={updateName}>Update Name</button>

        <input
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={updateEmail}>Update Email</button>

        <input
          type="text"
          placeholder="New Phone Number"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
        />
        <button onClick={updatePhoneNumber}>Update Phone Number</button>

        <input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
        <button onClick={updateProfilePicture}>Update Profile Picture</button>
      </div>
    </div>
  );
};

export default AccountSettings;
