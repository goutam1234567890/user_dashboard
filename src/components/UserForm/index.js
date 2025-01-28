import { useState, useEffect } from "react";
import {updateUser} from '../../Services/UserService'
import './index.css'

const UserForm = ({ user, onClose, refreshUsers, setUsers }) => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        department: "",
        username: "",
        phone: "",
        website: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                name: user.name,
                email: user.email,
                department: user.company.name,
                username: user.username,
                phone: user.phone,
                website: user.website,
            });
        }
    }, [user]);

    const handleAddUser = async () => {
        // Prepare the final payload for adding a new user
        const payload = {
            ...formData,
            company: { name: formData.department },
        };
    
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            };
    
            const url = "https://6756f736c0a427baf94b2bcd.mockapi.io/users";
    
            const response = await fetch(url, requestOptions);
    
            if (response.ok) {
                const result = await response.json();
                console.log("Server response:", result);
                refreshUsers();
                onClose();
            } else {
                alert("Failed to save user.");
            }
        } catch (error) {
            console.error("Error saving user:", error);
            alert("Failed to save user.");
        }
    };
    
    const handleUpdateUser = async () => {
        debugger
        // Prepare the final payload for updating a user
        const payload = {
          ...formData,
          company: { name: formData.department },
        };
      
        try {
          const response = await updateUser(payload)
          if (response.ok) {
            const result = await response.json();
      
            // Update the users state using functional update pattern
            setUsers((prevUsers) =>
              prevUsers.map((u) => (u.id === result.id ? result : u))
            );
      
            alert("User updated successfully.");
            console.log("Server response:", result);
            refreshUsers();
            // Close the form
            onClose();
          } else {
            alert("Failed to save user.");
          }
        } catch (error) {
          console.error("Error saving user:", error);
          alert("Failed to save user.");
        }
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            handleUpdateUser();
        } else {
            handleAddUser();
        }
    };
    


    return (
        <div className="userform-container">
            <div className="userform">
                <h2 className="heading2">{user ? "Edit User" : "Add User"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="label-input" id="name">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-value"
                            required
                            htmlFor="name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label-input">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input-value"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label-input">Department</label>
                        <input
                            type="text"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            className="input-value"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label-input">UserName</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="input-value"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label-input">Phone</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="input-value"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label-input">Website</label>
                        <input
                            type="text"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="input-value"
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="save-button"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;

